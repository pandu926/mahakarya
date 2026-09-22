import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import * as THREE from 'three'

const empty = { uBasalt: { value: null as THREE.Texture | null }, uBasaltReady: { value: 0 } }
const StoneContext = createContext(empty)

export function StoneTextureProvider({ children }: { children: ReactNode }) {
  const uniforms = useMemo(() => ({ uBasalt: { value: null as THREE.Texture | null }, uBasaltReady: { value: 0 } }), [])
  useEffect(() => {
    let disposed = false
    const texture = new THREE.TextureLoader().load('/assets/images/environment/basalt.webp', loaded => {
      if (disposed) { loaded.dispose(); return }
      loaded.wrapS = loaded.wrapT = THREE.RepeatWrapping
      loaded.anisotropy = 4
      uniforms.uBasalt.value = loaded
      uniforms.uBasaltReady.value = 1
    }, undefined, () => { uniforms.uBasaltReady.value = 0 })
    return () => { disposed = true; texture.dispose(); uniforms.uBasaltReady.value = 0 }
  }, [uniforms])
  return <StoneContext.Provider value={uniforms}>{children}</StoneContext.Provider>
}

export function useStoneTexture() { return useContext(StoneContext) }
