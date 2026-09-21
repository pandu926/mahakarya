import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const LANDMARK_X = [0, 22, 44, 68, 92, 118];
const WORLD_BACKGROUND = '#071018';

export const clamp01 = (value) => Math.min(1, Math.max(0, Number(value) || 0));

export const createSeededRandom = (seed = 1) => {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
};

export const getAdaptiveQuality = (width, navigatorLike = {}) => {
  const cores = Number(navigatorLike.hardwareConcurrency) || 4;
  const memory = Number(navigatorLike.deviceMemory) || 4;
  const isMobile = width < 768;
  const isTablet = width < 1100;
  const lowPower = cores <= 4 || memory <= 4;

  if (isMobile || (isTablet && lowPower)) {
    return {
      tier: 'low',
      particleCount: isMobile ? 220 : 320,
      fragmentCount: isMobile ? 10 : 16,
      maxDpr: 1,
      fogDensity: 0.018,
      antialias: false,
      shadows: false,
    };
  }

  if (isTablet || lowPower) {
    return {
      tier: 'medium',
      particleCount: 480,
      fragmentCount: 28,
      maxDpr: 1.25,
      fogDensity: 0.014,
      antialias: false,
      shadows: false,
    };
  }

  return {
    tier: 'high',
    particleCount: 760,
    fragmentCount: 44,
    maxDpr: 1.5,
    fogDensity: 0.011,
    antialias: true,
    shadows: true,
  };
};

const makeStandardMaterial = (color, options = {}) => new THREE.MeshStandardMaterial({
  color,
  roughness: 0.76,
  metalness: 0.16,
  ...options,
});

const createPalette = () => ({
  stone: makeStandardMaterial('#101d25', { roughness: 0.86, metalness: 0.08 }),
  stoneLight: makeStandardMaterial('#1b3039', { roughness: 0.72, metalness: 0.14 }),
  basalt: makeStandardMaterial('#0b141b', { roughness: 0.92, metalness: 0.04 }),
  graphite: makeStandardMaterial('#172730', { roughness: 0.63, metalness: 0.28 }),
  steel: makeStandardMaterial('#49616a', { roughness: 0.48, metalness: 0.64 }),
  gold: makeStandardMaterial('#d29a52', {
    color: '#d29a52',
    emissive: '#8d5620',
    emissiveIntensity: 1.25,
    roughness: 0.34,
    metalness: 0.68,
  }),
  ivory: makeStandardMaterial('#e3d4b3', {
    emissive: '#4f3b1e',
    emissiveIntensity: 0.26,
    roughness: 0.52,
  }),
  water: makeStandardMaterial('#496d79', {
    transparent: true,
    opacity: 0.58,
    roughness: 0.24,
    metalness: 0.1,
  }),
});

const createEnergyMaterial = (uniforms = {}) => new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uStrength: { value: 1 },
    ...uniforms,
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uStrength;
    void main() {
      float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
      float pulse = 0.72 + 0.28 * sin(uTime * 1.7 + vUv.y * 14.0);
      vec3 color = mix(vec3(0.98, 0.81, 0.48), vec3(1.0), vUv.y);
      gl_FragColor = vec4(color, edge * pulse * uStrength * 0.86);
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.DoubleSide,
});

const createWaterfallMaterial = () => new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uStrength: { value: 0.8 } },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 transformed = position;
      transformed.x += sin(uv.y * 13.0 + uTime * 0.5) * 0.035;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uStrength;
    void main() {
      float stream = 0.52 + 0.48 * sin(vUv.x * 29.0 + vUv.y * 5.0 - uTime * 1.8);
      float edge = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
      float alpha = edge * (0.28 + stream * 0.24) * uStrength;
      gl_FragColor = vec4(0.48, 0.69, 0.73, alpha);
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.DoubleSide,
});

const makeLine = (points, material) => {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(geometry, material);
};

const createPortalLandmark = (palette) => {
  const group = new THREE.Group();
  group.name = 'PreludePortal';

  const slabGeometry = new THREE.BoxGeometry(2.1, 9.5, 0.8);
  [-2.05, 2.05].forEach((x) => {
    const slab = new THREE.Mesh(slabGeometry, palette.basalt);
    slab.position.set(x, 4.75, 0);
    slab.castShadow = true;
    slab.receiveShadow = true;
    group.add(slab);
  });

  const top = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.65, 0.9), palette.stone);
  top.position.set(0, 9.25, 0);
  top.castShadow = true;
  group.add(top);

  const seamMaterial = createEnergyMaterial();
  const seam = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 8.1), seamMaterial);
  seam.position.set(0, 4.2, 0.47);
  group.add(seam);

  const ringMaterial = new THREE.MeshBasicMaterial({
    color: '#b77d3d',
    transparent: true,
    opacity: 0.27,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.025, 8, 72), ringMaterial);
  ring.position.set(0, 4.2, 0.35);
  ring.scale.y = 1.85;
  group.add(ring);

  const person = new THREE.Group();
  person.position.set(0, 0.12, 1.25);
  const personMaterial = new THREE.MeshBasicMaterial({ color: '#050b0f' });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.33, 3, 8), personMaterial);
  body.position.y = 0.26;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.095, 8, 6), personMaterial);
  head.position.y = 0.57;
  person.add(body, head);
  group.add(person);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 9),
    makeStandardMaterial('#09151c', { roughness: 0.86, metalness: 0.24 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -0.06, 0.4);
  floor.receiveShadow = true;
  group.add(floor);

  group.userData = { seamMaterial, ring };
  return group;
};

const createTree = (palette) => {
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.22, 1.9, 7), palette.graphite);
  trunk.position.y = 1.0;
  tree.add(trunk);

  const crownMaterial = makeStandardMaterial('#1d4140', { roughness: 0.9, metalness: 0.04 });
  [
    [0, 2.1, 0, 0.78],
    [-0.36, 2.55, 0.02, 0.46],
    [0.38, 2.62, -0.02, 0.52],
  ].forEach(([x, y, z, radius]) => {
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, 1), crownMaterial);
    crown.position.set(x, y, z);
    crown.scale.y = 1.15;
    tree.add(crown);
  });

  return tree;
};

const createOriginsLandmark = (palette, quality) => {
  const group = new THREE.Group();
  group.name = 'OriginsIsland';

  const island = new THREE.Mesh(new THREE.IcosahedronGeometry(2.65, 1), palette.basalt);
  island.scale.set(1.2, 0.58, 0.86);
  island.position.y = 1.8;
  island.castShadow = true;
  island.receiveShadow = true;
  group.add(island);

  const soil = new THREE.Mesh(new THREE.CylinderGeometry(2.06, 1.52, 0.27, 9), palette.stone);
  soil.position.y = 2.55;
  soil.scale.z = 0.75;
  group.add(soil);
  group.add(createTree(palette));

  const random = createSeededRandom(402);
  const fragments = new THREE.Group();
  const count = Math.min(quality.fragmentCount, 22);
  for (let index = 0; index < count; index += 1) {
    const angle = random() * Math.PI * 2;
    const radius = 3.15 + random() * 1.9;
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.11 + random() * 0.27, 0),
      index % 3 === 0 ? palette.stoneLight : palette.graphite,
    );
    rock.position.set(
      Math.cos(angle) * radius,
      1.3 + random() * 3.0,
      Math.sin(angle) * radius * 0.54,
    );
    rock.rotation.set(random() * 2, random() * 2, random() * 2);
    rock.userData = { orbit: angle, radius, speed: 0.06 + random() * 0.11, phase: random() * 5 };
    fragments.add(rock);
  }
  group.add(fragments);
  group.userData = { island, fragments };
  return group;
};

const createCraftLandmark = (palette) => {
  const group = new THREE.Group();
  group.name = 'CraftModules';
  const modules = [];
  const specs = [
    { label: 'SYSTEM', position: [-2.15, 3.1, 0], size: [3.3, 1.15, 1.0], rotation: [0, 0.05, -0.08] },
    { label: 'INTERFACE', position: [1.85, 4.3, -0.25], size: [2.7, 1.6, 0.68], rotation: [0.04, -0.12, 0.1] },
    { label: 'MOTION', position: [-1.1, 5.55, 0.3], size: [2.2, 0.62, 1.5], rotation: [0.1, 0.1, -0.04] },
    { label: 'SPACE', position: [1.95, 2.2, 0.2], size: [1.35, 2.2, 1.25], rotation: [-0.08, 0.2, 0.04] },
  ];

  specs.forEach((spec, index) => {
    const module = new THREE.Group();
    module.position.set(...spec.position);
    module.rotation.set(...spec.rotation);
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(...spec.size),
      index % 2 === 0 ? palette.graphite : palette.stoneLight,
    );
    body.castShadow = true;
    body.receiveShadow = true;
    module.add(body);
    const edgeGeometrySource = new THREE.BoxGeometry(...spec.size.map((value) => value * 1.01));
    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(edgeGeometrySource),
      new THREE.LineBasicMaterial({ color: '#b48650', transparent: true, opacity: 0.45 }),
    );
    edgeGeometrySource.dispose();
    module.add(edge);
    modules.push({ module, basePosition: module.position.clone(), baseRotation: module.rotation.clone() });
    group.add(module);
  });

  const rail = makeLine(
    [new THREE.Vector3(-4.5, 1.35, 0), new THREE.Vector3(-1.1, 1.8, 0.4), new THREE.Vector3(3.9, 1.5, 0)],
    new THREE.LineBasicMaterial({ color: '#8a673d', transparent: true, opacity: 0.6 }),
  );
  group.add(rail);
  group.userData = { modules };
  return group;
};

const createImpactLandmark = (palette) => {
  const group = new THREE.Group();
  group.name = 'ImpactCliff';

  const cliff = new THREE.Mesh(new THREE.BoxGeometry(8, 3.8, 2.3), palette.basalt);
  cliff.position.set(0, 1.9, 0.8);
  cliff.rotation.z = -0.08;
  cliff.castShadow = true;
  cliff.receiveShadow = true;
  group.add(cliff);

  const ledge = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.42, 3.1), palette.stoneLight);
  ledge.position.set(-0.4, 3.86, 0.3);
  ledge.rotation.z = -0.04;
  group.add(ledge);

  const waterfallMaterial = createWaterfallMaterial();
  const waterfall = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 4.4, 12, 16), waterfallMaterial);
  waterfall.position.set(-1.35, 1.9, -0.78);
  group.add(waterfall);

  const projectSlabs = new THREE.Group();
  [-2.4, 0, 2.35].forEach((x, index) => {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.35 + index * 0.24, 0.35), index === 1 ? palette.gold : palette.steel);
    slab.position.set(x, 5.1 + index * 0.13, -0.2);
    slab.rotation.z = (index - 1) * 0.045;
    slab.castShadow = true;
    projectSlabs.add(slab);
  });
  group.add(projectSlabs);

  const mistMaterial = new THREE.PointsMaterial({
    color: '#8aaab0',
    size: 0.16,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const mistGeometry = new THREE.BufferGeometry();
  const mistPositions = new Float32Array(54 * 3);
  const random = createSeededRandom(904);
  for (let index = 0; index < 54; index += 1) {
    mistPositions[index * 3] = -1.35 + (random() - 0.5) * 3.2;
    mistPositions[index * 3 + 1] = -0.15 + random() * 1.7;
    mistPositions[index * 3 + 2] = -0.84 + (random() - 0.5) * 0.6;
  }
  mistGeometry.setAttribute('position', new THREE.BufferAttribute(mistPositions, 3));
  group.add(new THREE.Points(mistGeometry, mistMaterial));
  group.userData = { waterfallMaterial };
  return group;
};

const createProcessLandmark = (palette) => {
  const group = new THREE.Group();
  group.name = 'ProcessOrrery';
  const rings = [];
  const ringMaterials = [];
  for (let index = 0; index < 5; index += 1) {
    const material = new THREE.MeshStandardMaterial({
      color: index === 2 ? '#d29a52' : '#58717a',
      emissive: index === 2 ? '#8d5620' : '#142b32',
      emissiveIntensity: 0.3,
      metalness: 0.72,
      roughness: 0.36,
      transparent: true,
      opacity: 0.84,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25 + index * 0.52, 0.025 + (index === 2 ? 0.018 : 0), 8, 72), material);
    ring.rotation.set(index * 0.18, index * 0.27, index * 0.12);
    ring.position.y = 2.85;
    ring.userData = { phase: index * 0.7, axis: index % 2 ? 'z' : 'y' };
    rings.push(ring);
    ringMaterials.push(material);
    group.add(ring);
  }

  const axis = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 6.7, 8), palette.steel);
  axis.position.y = 2.85;
  group.add(axis);

  const nodes = new THREE.Group();
  for (let index = 0; index < 5; index += 1) {
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), index === 0 ? palette.gold : palette.ivory);
    const angle = (index / 5) * Math.PI * 2 - Math.PI / 2;
    node.position.set(Math.cos(angle) * (1.7 + index * 0.3), 2.85 + Math.sin(angle) * 1.1, 0.1);
    nodes.add(node);
  }
  group.add(nodes);

  const connectors = new THREE.Group();
  for (let index = 0; index < 5; index += 1) {
    const start = new THREE.Vector3(0, 2.85, 0);
    const end = nodes.children[index].position.clone();
    connectors.add(makeLine([start, end], new THREE.LineBasicMaterial({ color: '#6a7f83', transparent: true, opacity: 0.38 })));
  }
  group.add(connectors);
  group.userData = { rings, ringMaterials, nodes };
  return group;
};

const createFutureLandmark = (palette) => {
  const group = new THREE.Group();
  group.name = 'FutureGateCity';

  const gateMaterial = new THREE.MeshStandardMaterial({
    color: '#72848a',
    emissive: '#69502b',
    emissiveIntensity: 0.64,
    metalness: 0.58,
    roughness: 0.42,
  });
  const left = new THREE.Mesh(new THREE.BoxGeometry(0.48, 8.2, 0.58), gateMaterial);
  const right = left.clone();
  left.position.set(-2.9, 4.1, 0);
  right.position.set(2.9, 4.1, 0);
  const beam = new THREE.Mesh(new THREE.BoxGeometry(6.25, 0.5, 0.58), gateMaterial);
  beam.position.set(0, 8.0, 0);
  group.add(left, right, beam);

  const city = new THREE.Group();
  const random = createSeededRandom(1801);
  for (let index = 0; index < 18; index += 1) {
    const height = 0.8 + random() * 3.8;
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(0.42 + random() * 0.65, height, 0.45 + random() * 0.5),
      index % 4 === 0 ? palette.steel : palette.graphite,
    );
    building.position.set(-4.7 + random() * 9.4, height / 2, -1.0 - random() * 2.8);
    city.add(building);
  }
  group.add(city);

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 24, 16),
    new THREE.MeshBasicMaterial({ color: '#e5bf78', transparent: true, opacity: 0.8 }),
  );
  sun.position.set(0, 5.8, -4.3);
  group.add(sun);

  const person = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.42, 3, 8), new THREE.MeshBasicMaterial({ color: '#050b0f' }));
  person.position.set(0, 0.3, 1.1);
  group.add(person);
  group.userData = { gateMaterial, sun };
  return group;
};

const createParticles = (quality) => {
  const random = createSeededRandom(1337);
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(quality.particleCount * 3);
  const colors = new Float32Array(quality.particleCount * 3);
  const sizes = new Float32Array(quality.particleCount);
  const colorA = new THREE.Color('#718b92');
  const colorB = new THREE.Color('#b98b4f');

  for (let index = 0; index < quality.particleCount; index += 1) {
    positions[index * 3] = -16 + random() * 148;
    positions[index * 3 + 1] = 0.2 + random() * 11.2;
    positions[index * 3 + 2] = -8 + random() * 9;
    const color = colorA.clone().lerp(colorB, random() * 0.28);
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
    sizes[index] = 0.35 + random() * 0.9;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  const material = new THREE.PointsMaterial({
    vertexColors: true,
    size: quality.tier === 'low' ? 0.035 : 0.045,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, material);
  points.name = 'SeededAtmosphere';
  points.userData = { basePositions: positions.slice(), drift: 0.018 + random() * 0.02 };
  return points;
};

const createTrail = () => {
  const curve = new THREE.CatmullRomCurve3(
    LANDMARK_X.map((x, index) => new THREE.Vector3(x, 0.18 + (index % 2) * 0.06, index === 0 ? 1.1 : 0)),
    false,
    'catmullrom',
    0.42,
  );
  const uniforms = {
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uOpacity: { value: 0.88 },
  };
  const geometry = new THREE.TubeGeometry(curve, 220, 0.038, 6, false);
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying float vAlong;
      void main() {
        vAlong = uv.x;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying float vAlong;
      uniform float uProgress;
      uniform float uTime;
      uniform float uOpacity;
      void main() {
        float reveal = 1.0 - smoothstep(uProgress - 0.012, uProgress + 0.012, vAlong);
        float leading = 1.0 + 0.55 * exp(-abs(vAlong - uProgress) * 80.0);
        float pulse = 0.9 + 0.1 * sin(uTime * 2.0 + vAlong * 18.0);
        gl_FragColor = vec4(0.91, 0.64, 0.29, reveal * uOpacity * leading * pulse);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const trail = new THREE.Mesh(geometry, material);
  trail.name = 'GoldJourneyTrail';

  const haloMaterial = material.clone();
  haloMaterial.uniforms = {
    uProgress: uniforms.uProgress,
    uTime: uniforms.uTime,
    uOpacity: { value: 0.16 },
  };
  const halo = new THREE.Mesh(new THREE.TubeGeometry(curve, 220, 0.16, 6, false), haloMaterial);
  halo.name = 'GoldJourneyHalo';
  trail.add(halo);
  trail.userData = { uniforms };
  return trail;
};

const createTargetCurve = () => new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 2.4, 0),
  new THREE.Vector3(22, 2.8, 0),
  new THREE.Vector3(44, 2.4, 0),
  new THREE.Vector3(68, 2.6, 0),
  new THREE.Vector3(92, 2.2, 0),
  new THREE.Vector3(120, 3.0, 0),
], false, 'catmullrom', 0.42);

const createCameraCurve = () => new THREE.CatmullRomCurve3([
  new THREE.Vector3(-8, 3.4, 12),
  new THREE.Vector3(4, 3.1, 10),
  new THREE.Vector3(22, 4.2, 11),
  new THREE.Vector3(43, 3.6, 10),
  new THREE.Vector3(67, 4.5, 12),
  new THREE.Vector3(92, 3.2, 11),
  new THREE.Vector3(116, 4.8, 13),
], false, 'catmullrom', 0.42);

const disposeMaterial = (material) => {
  if (!material) return;
  if (Array.isArray(material)) {
    material.forEach(disposeMaterial);
    return;
  }
  material.dispose();
};

const disposeScene = (scene) => {
  scene.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) disposeMaterial(object.material);
  });
};

const canUseWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false })
      || canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false })
      || canvas.getContext('experimental-webgl', { failIfMajorPerformanceCaveat: false }),
    );
  } catch {
    return false;
  }
};

const getLocalProgress = (progress, start, end) => clamp01((progress - start) / (end - start));

const WebGLWorld = ({
  progress = 0,
  reducedMotion: reducedMotionOverride,
  onAvailabilityChange,
  className = '',
  style = {},
}) => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(clamp01(progress));
  const reducedMotionOverrideRef = useRef(reducedMotionOverride);
  const availabilityRef = useRef(onAvailabilityChange);
  const [status, setStatus] = useState('pending');

  progressRef.current = clamp01(progress);
  reducedMotionOverrideRef.current = reducedMotionOverride;
  availabilityRef.current = onAvailabilityChange;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined' || typeof document === 'undefined') return undefined;
    if (!canUseWebGL()) {
      setStatus('unavailable');
      root.dataset.webglFallback = 'true';
      availabilityRef.current?.(false);
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const initialWidth = Math.max(1, root.clientWidth || window.innerWidth);
    const quality = getAdaptiveQuality(initialWidth, window.navigator);
    const reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const hasReducedMotionOverride = typeof reducedMotionOverrideRef.current === 'boolean';
    const reducedMotionRef = {
      current: hasReducedMotionOverride ? reducedMotionOverrideRef.current : Boolean(reducedMotionQuery?.matches),
    };
    const touchDevice = 'ontouchstart' in window || (window.navigator.maxTouchPoints || 0) > 0;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let renderer;
    let stopped = false;
    let visible = !document.hidden;
    let frameId = null;
    let adaptiveScale = 1;
    let sampleTime = 0;
    let sampleFrames = 0;
    let previousFrameTime = 0;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: quality.antialias,
        powerPreference: 'high-performance',
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.95;
      renderer.shadowMap.enabled = quality.shadows;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(WORLD_BACKGROUND);
      scene.fog = new THREE.FogExp2(WORLD_BACKGROUND, quality.fogDensity);
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 260);
      const cameraCurve = createCameraCurve();
      const targetCurve = createTargetCurve();
      const currentCamera = new THREE.Vector3();
      const currentTarget = new THREE.Vector3();
      const lookTarget = new THREE.Vector3();
      const palette = createPalette();

      const hemisphere = new THREE.HemisphereLight('#6d8991', '#081017', 0.28);
      const key = new THREE.DirectionalLight('#adc0bf', 0.72);
      key.position.set(-12, 18, 12);
      key.castShadow = quality.shadows;
      if (quality.shadows) {
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.near = 1;
        key.shadow.camera.far = 70;
        key.shadow.camera.left = -25;
        key.shadow.camera.right = 25;
        key.shadow.camera.top = 25;
        key.shadow.camera.bottom = -12;
      }
      const warm = new THREE.PointLight('#c88a47', 0.9, 26, 2);
      warm.position.set(0, 5.2, 3.8);
      scene.add(hemisphere, key, warm);

      const portal = createPortalLandmark(palette);
      const origins = createOriginsLandmark(palette, quality);
      const craft = createCraftLandmark(palette);
      const impact = createImpactLandmark(palette);
      const process = createProcessLandmark(palette);
      const future = createFutureLandmark(palette);
      portal.position.x = LANDMARK_X[0];
      origins.position.x = LANDMARK_X[1];
      craft.position.x = LANDMARK_X[2];
      impact.position.x = LANDMARK_X[3];
      process.position.x = LANDMARK_X[4];
      future.position.x = LANDMARK_X[5];
      scene.add(portal, origins, craft, impact, process, future);

      const particles = createParticles(quality);
      const trail = createTrail();
      scene.add(particles, trail);
      root.dataset.worldLandmarks = 'portal,island,craft,cliff,orrery,gate';
      root.dataset.webglFallback = 'false';
      availabilityRef.current?.(true);
      setStatus('ready');

      const resize = () => {
        const width = Math.max(1, root.clientWidth || window.innerWidth);
        const height = Math.max(1, root.clientHeight || window.innerHeight);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const dpr = Math.min(window.devicePixelRatio || 1, quality.maxDpr) * adaptiveScale;
        renderer.setPixelRatio(Math.max(0.7, dpr));
        renderer.setSize(width, height, false);
      };

      const onPointerMove = (event) => {
        if (reducedMotionRef.current || touchDevice) return;
        pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
        pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      };
      const resetPointer = () => {
        pointer.targetX = 0;
        pointer.targetY = 0;
      };
      const onReducedMotionChange = (event) => {
        if (hasReducedMotionOverride) return;
        reducedMotionRef.current = Boolean(event.matches);
        if (reducedMotionRef.current) resetPointer();
      };
      const onVisibilityChange = () => {
        visible = !document.hidden;
        if (visible && frameId === null && !stopped) frameId = requestAnimationFrame(renderFrame);
      };

      const updateDynamicScene = (currentProgress, elapsed) => {
        const animationTime = reducedMotionRef.current ? 0 : elapsed;
        const portalLocal = getLocalProgress(currentProgress, 0, 0.16);
        const craftLocal = getLocalProgress(currentProgress, 0.29, 0.54);
        const impactLocal = getLocalProgress(currentProgress, 0.47, 0.72);
        const processLocal = getLocalProgress(currentProgress, 0.65, 0.9);
        const futureLocal = getLocalProgress(currentProgress, 0.82, 1);
        const trailUniforms = trail.userData.uniforms;
        trailUniforms.uProgress.value = currentProgress;
        trailUniforms.uTime.value = animationTime;
        portal.userData.seamMaterial.uniforms.uTime.value = animationTime;
        portal.userData.seamMaterial.uniforms.uStrength.value = 0.48 + (1 - portalLocal) * 0.66;
        portal.userData.ring.rotation.z = animationTime * 0.035;
        warm.position.x = THREE.MathUtils.lerp(0, 118, currentProgress);
        warm.position.y = 4.8 + Math.sin(animationTime * 0.3) * 0.45;
        warm.intensity = 0.34 + Math.max(portalLocal, futureLocal) * 0.72;

        origins.position.y = Math.sin(elapsed * 0.28) * 0.08 * (reducedMotionRef.current ? 0 : 1);
        origins.userData.fragments.rotation.y = elapsed * 0.012 * (reducedMotionRef.current ? 0 : 1);
        origins.userData.fragments.children.forEach((rock) => {
          rock.rotation.y += rock.userData.speed * 0.003 * (reducedMotionRef.current ? 0 : 1);
        });

        craft.userData.modules.forEach(({ module, basePosition, baseRotation }, index) => {
          const edge = Math.abs(craftLocal - 0.5) * 2;
          const offset = edge * 0.35;
          module.position.copy(basePosition);
          module.position.x += (index % 2 === 0 ? -offset : offset) * (reducedMotionRef.current ? 0 : 1);
          module.rotation.copy(baseRotation);
          module.rotation.z += (index % 2 === 0 ? -1 : 1) * edge * 0.045 * (reducedMotionRef.current ? 0 : 1);
        });

        impact.userData.waterfallMaterial.uniforms.uTime.value = animationTime;
        impact.userData.waterfallMaterial.uniforms.uStrength.value = 0.38 + impactLocal * 0.42;
        process.userData.rings.forEach((ring, index) => {
          if (!reducedMotionRef.current) {
            ring.rotation[ring.userData.axis] += (0.0008 + index * 0.00024);
          }
          process.userData.ringMaterials[index].emissiveIntensity = 0.22 + getLocalProgress(processLocal, index * 0.17, Math.min(1, index * 0.17 + 0.3)) * 0.64;
        });
        process.userData.nodes.children.forEach((node, index) => {
          const active = getLocalProgress(processLocal, index * 0.17, Math.min(1, index * 0.17 + 0.3));
          node.scale.setScalar(1 + active * 0.24);
        });
        future.userData.gateMaterial.emissiveIntensity = 0.3 + futureLocal * 0.72;
        future.userData.sun.material.opacity = 0.52 + futureLocal * 0.34;
        particles.rotation.y = animationTime * particles.userData.drift;
      };

      const renderFrame = (time) => {
        frameId = null;
        if (stopped || !visible) return;
        frameId = requestAnimationFrame(renderFrame);
        const elapsed = time * 0.001;
        const frameDuration = previousFrameTime ? Math.min(50, time - previousFrameTime) : 16.67;
        previousFrameTime = time;
        const targetProgress = progressRef.current;
        const motionFactor = reducedMotionRef.current ? 1 : 0.065;
        const cameraProgress = reducedMotionRef.current
          ? targetProgress
          : THREE.MathUtils.lerp(camera.userData.progress || 0, targetProgress, motionFactor);
        camera.userData.progress = cameraProgress;
        cameraCurve.getPointAt(cameraProgress, currentCamera);
        targetCurve.getPointAt(cameraProgress, currentTarget);
        pointer.x = THREE.MathUtils.lerp(pointer.x, pointer.targetX, reducedMotionRef.current ? 1 : 0.04);
        pointer.y = THREE.MathUtils.lerp(pointer.y, pointer.targetY, reducedMotionRef.current ? 1 : 0.04);
        camera.position.copy(currentCamera);
        camera.position.x += pointer.x * 0.18;
        camera.position.y += pointer.y * -0.1;
        lookTarget.copy(currentTarget);
        lookTarget.x += pointer.x * 0.6;
        lookTarget.y += pointer.y * -0.26;
        camera.lookAt(lookTarget);
        updateDynamicScene(cameraProgress, elapsed);
        renderer.render(scene, camera);

        sampleTime += frameDuration;
        sampleFrames += 1;
        if (sampleFrames >= 45) {
          const averageFrame = sampleTime / sampleFrames;
          if (averageFrame > 24 && adaptiveScale > 0.72) {
            adaptiveScale = Math.max(0.72, adaptiveScale - 0.1);
            resize();
          } else if (averageFrame < 16 && adaptiveScale < 1) {
            adaptiveScale = Math.min(1, adaptiveScale + 0.05);
            resize();
          }
          sampleTime = 0;
          sampleFrames = 0;
        }
      };

      resize();
      window.addEventListener('resize', resize, { passive: true });
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', resetPointer, { passive: true });
      document.addEventListener('visibilitychange', onVisibilityChange);
      if (reducedMotionQuery) {
        reducedMotionQuery.addEventListener?.('change', onReducedMotionChange);
        reducedMotionQuery.addListener?.(onReducedMotionChange);
      }
      frameId = requestAnimationFrame(renderFrame);

      return () => {
        stopped = true;
        if (frameId !== null) cancelAnimationFrame(frameId);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerleave', resetPointer);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (reducedMotionQuery) {
          reducedMotionQuery.removeEventListener?.('change', onReducedMotionChange);
          reducedMotionQuery.removeListener?.(onReducedMotionChange);
        }
        disposeScene(scene);
        renderer.dispose();
        renderer.forceContextLoss?.();
      };
    } catch {
      renderer?.dispose();
      root.dataset.webglFallback = 'true';
      availabilityRef.current?.(false);
      setStatus('unavailable');
      return undefined;
    }
  }, []);

  return (
    <div
      ref={rootRef}
      className={`webgl-world ${className}${status === 'unavailable' ? ' webgl-world--fallback' : ''}`}
      data-webgl-status={status}
      data-webgl-fallback={status === 'unavailable' ? 'true' : 'false'}
      aria-label="Procedural career journey world"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '320px',
        overflow: 'hidden',
        isolation: 'isolate',
        background: status === 'unavailable'
          ? 'radial-gradient(circle at 70% 38%, rgba(47, 72, 77, 0.54), transparent 42%), #071018'
          : WORLD_BACKGROUND,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        className="webgl-world__canvas"
        aria-hidden="true"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
      <span
        className="webgl-world__fallback-signal"
        data-webgl-fallback-signal="true"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: status === 'unavailable' ? 1 : 0,
          background: 'linear-gradient(112deg, transparent 12%, rgba(211, 157, 82, 0.12) 48%, transparent 82%)',
          transition: 'opacity 240ms ease',
        }}
      />
    </div>
  );
};

export default WebGLWorld;
