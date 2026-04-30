---
name: threejs-comprehensive
description: Complete Three.js and React Three Fiber skill covering 3D graphics fundamentals, scenes, cameras, renderers, geometry, materials, lighting, animations, physics, post-processing, and React integration. Use for any 3D web development work with Three.js or React Three Fiber.
---

# Three.js Comprehensive

## When to Use This Skill

Apply this skill for any 3D web development including:
- Basic Three.js scene setup and rendering
- React Three Fiber component development
- 3D geometry and mesh creation
- Materials, textures, and lighting
- Animations and keyframes
- Physics simulation
- Post-processing effects
- Asset loading (GLTF models, textures, HDR environments)

## Three.js Fundamentals

### Basic Scene Setup
```javascript
import * as THREE from 'three';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Add object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position camera
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

### Coordinate System
- **X axis**: Left to right (negative to positive)
- **Y axis**: Bottom to top (negative to positive)
- **Z axis**: Near to far (positive towards camera in right-handed system)

### Object Hierarchy (Scene Graph)
```javascript
// Parent-child relationships
const group = new THREE.Group();
const child = new THREE.Mesh(geometry, material);
group.add(child);
scene.add(group);

// Transforms are relative to parent
group.position.x = 2;  // Moves entire group
child.position.x = 1;  // Moves child relative to group
```

## React Three Fiber (R3F)

### Basic Setup
```javascript
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box />
      <OrbitControls />
    </Canvas>
  );
}

function Box() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}
```

### Core Hooks

#### useFrame
```javascript
import { useFrame } from '@react-three/fiber';

function RotatingCube() {
  const meshRef = useRef();

  // Access to state and delta time
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 0.5;

    // Access clock, camera, mouse, etc.
    const time = state.clock.getElapsedTime();
    const { camera, mouse } = state;
  });

  return <mesh ref={meshRef}><boxGeometry /><meshStandardMaterial /></mesh>;
}
```

#### useThree
```javascript
import { useThree } from '@react-three/fiber';

function CameraController() {
  const { camera, scene, gl } = useThree();

  useEffect(() => {
    // Access Three.js internals
    camera.position.set(0, 5, 10);
    scene.background = new THREE.Color(0x1a1a2e);
  }, []);

  return null;
}
```

#### useEffect and cleanup
```javascript
function AnimatedMesh() {
  const meshRef = useRef();

  useEffect(() => {
    // Setup
    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <mesh ref={meshRef}><boxGeometry /><meshStandardMaterial /></mesh>;
}
```

## Geometry and Meshes

### Built-in Geometries
```javascript
// Basic shapes
const box = new THREE.BoxGeometry(1, 1, 1);
const sphere = new THREE.SphereGeometry(1, 32, 32);
const cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const cone = new THREE.ConeGeometry(0.5, 1, 32);
const torus = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
const plane = new THREE.PlaneGeometry(1, 1);

// Complex shapes
const icosahedron = new THREE.IcosahedronGeometry(1, 0);
const dodecahedron = new THREE.DodecahedronGeometry(1);
const octahedron = new THREE.OctahedronGeometry(1);
const tetrahedron = new THREE.TetrahedronGeometry(1);
```

### BufferGeometry (Custom Meshes)
```javascript
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1, -1,  1,  // Vertex 1
   1, -1,  1,  // Vertex 2
   1,  1,  1,  // Vertex 3
]);

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
```

### Instancing (Performance)
```javascript
// Three.js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const instancedMesh = new THREE.InstancedMesh(geometry, material, 1000);

// Set matrices for each instance
const dummy = new THREE.Object3D();
for (let i = 0; i < 1000; i++) {
  dummy.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
  dummy.updateMatrix();
  instancedMesh.setMatrixAt(i, dummy.matrix);
}

// React Three Fiber
<Instances>
  <boxGeometry />
  <meshStandardMaterial />
  {Array.from({ length: 1000 }).map((_, i) => (
    <Instance
      key={i}
      position={[Math.random() * 10, Math.random() * 10, Math.random() * 10]}
    />
  ))}
</Instances>
```

## Materials and Textures

### PBR Materials
```javascript
// MeshStandardMaterial (physically based)
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  metalness: 0.5,      // 0 = non-metallic, 1 = metallic
  roughness: 0.5,      // 0 = smooth, 1 = rough
  emissive: 0x000000,
  emissiveIntensity: 1,
});

// MeshPhysicalMaterial (advanced PBR)
const material = new THREE.MeshPhysicalMaterial({
  color: 0x00ff00,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1.0,      // Clear coat layer
  clearcoatRoughness: 0.1,
  transmission: 0,     // Glass-like transmission
  thickness: 0.5,
});
```

### Textures
```javascript
const loader = new THREE.TextureLoader();
const texture = loader.load('texture.jpg');

const material = new THREE.MeshStandardMaterial({
  map: texture,              // Color texture
  normalMap: normalTexture,  // Normal map
  roughnessMap: roughnessTexture,
  metalnessMap: metalnessTexture,
  emissiveMap: emissiveTexture,
  displacementMap: displacementTexture,
  displacementScale: 0.1,
});

// React Three Fiber
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function TexturedMesh() {
  const texture = useLoader(TextureLoader, 'texture.jpg');
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
```

### Environment Maps (IBL)
```javascript
import { Environment, CubeCamera } from '@react-three/drei';

// Simple environment
<Environment preset="sunset" />

// Custom HDRI
<Environment files="hdri.hdr" />

// Cube camera for reflections
<CubeCamera resolution={256}>
  {(texture) => <meshStandardMaterial envMap={texture} />}
</CubeCamera>
```

## Lighting

### Light Types
```javascript
// Ambient light (fill)
const ambient = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambient);

// Directional light (sun-like)
const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(5, 10, 7);
directional.castShadow = true;
scene.add(directional);

// Point light (bulb-like)
const point = new THREE.PointLight(0xff0000, 1, 100);
point.position.set(10, 10, 10);
scene.add(point);

// Spot light (flashlight-like)
const spot = new THREE.SpotLight(0xffffff, 1);
spot.position.set(10, 10, 10);
spot.angle = Math.PI / 6;
spot.penumbra = 0.5;
scene.add(spot);

// React Three Fiber
<ambientLight intensity={0.5} />
<directionalLight position={[10, 10, 10]} castShadow />
<pointLight position={[10, 10, 10]} color="red" intensity={1} />
<spotLight position={[10, 10, 10]} angle={Math.PI / 6} penumbra={0.5} />
```

### Shadows
```javascript
// Enable shadows on renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Configure light to cast shadows
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

// Configure mesh to cast/receive shadows
mesh.castShadow = true;
mesh.receiveShadow = true;

// React Three Fiber
<Canvas shadows>
  <directionalLight castShadow shadow-mapSize={[2048, 2048]} />
  <mesh castShadow>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
  <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[10, 10]} />
    <meshStandardMaterial />
  </mesh>
</Canvas>
```

## Animations

### Keyframe Animation
```javascript
// Simple rotation
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  renderer.render(scene, camera);
}

// Using clock for smooth animation
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mesh.position.x += delta * 2; // Move 2 units per second
  renderer.render(scene, camera);
}
```

### GLTF Animation (React Three Fiber)
```javascript
import { useGLTF, useAnimations } from '@react-three/drei';

function Model({ url }) {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    // Play specific animation
    actions?.Walk?.play();

    // Cleanup
    return () => actions?.Walk?.stop();
  }, [actions]);

  return <primitive object={scene} />;
}
```

### Procedural Animation
```javascript
// Sine wave animation
useFrame((state) => {
  const time = state.clock.getElapsedTime();
  mesh.position.y = Math.sin(time) * 2;
});

// Complex multi-axis animation
useFrame((state) => {
  const time = state.clock.getElapsedTime();
  mesh.position.x = Math.cos(time) * 3;
  mesh.position.z = Math.sin(time) * 3;
  mesh.rotation.y = time;
});
```

## Physics (React Three Rapier)

### Basic Setup
```javascript
import { Physics, RigidBody, RigidBodyApi } from '@react-three/rapier';

function Scene() {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <RigidBody type="dynamic" position={[0, 5, 0]}>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </RigidBody>
    </Physics>
  );
}
```

### Physics Interactions
```javascript
function PhysicsBox() {
  const ref = useRef<RigidBodyApi>(null);

  const jump = () => {
    ref.current?.applyImpulse({ x: 0, y: 5, z: 0 });
  };

  const push = () => {
    ref.current?.applyImpulse({ x: 2, y: 0, z: 0 });
  };

  return (
    <>
      <RigidBody ref={ref} type="dynamic">
        <mesh onClick={jump}>
          <boxGeometry />
          <meshStandardMaterial color="blue" />
        </mesh>
      </RigidBody>
      <button onClick={push}>Push</button>
    </>
  );
}
```

### Colliders and Sensors
```javascript
// Colliders for different shapes
<RigidBody colliders="hull">  // Automatic convex hull
<RigidBody colliders="ball">  // Sphere collider
<RigidBody colliders="cuboid">  // Box collider

// Custom collider
<RigidBody colliders={false}>
  <Collider shape="trimesh" args={[mesh]} />
</RigidBody>

// Sensor (no physics response, only detection)
<RigidBody type="fixed" sensor>
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="yellow" />
  </mesh>
</RigidBody>
```

## Post-Processing

### Bloom Effect
```javascript
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Scene() {
  return (
    <Canvas>
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
      {/* Scene content */}
    </Canvas>
  );
}
```

### Depth of Field
```javascript
import { DepthOfField } from '@react-three/postprocessing';

<EffectComposer>
  <DepthOfField
    focusDistance={0.025}
    focalLength={0.05}
    bokehScale={6}
    height={480}
  />
</EffectComposer>
```

### Multiple Effects
```javascript
<EffectComposer>
  <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
  <DepthOfField focusDistance={0.025} focalLength={0.05} bokehScale={6} />
  <Noise opacity={0.05} />
  <Vignette eskil={false} offset={0.1} darkness={1.1} />
</EffectComposer>
```

## Asset Loading

### Loading GLTF Models
```javascript
import { useGLTF, useAnimations } from '@react-three/drei';

function Model({ url }) {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    // Preload animations
    Object.values(actions).forEach(action => {
      action.reset().fadeIn(0.5).play();
    });

    return () => {
      // Cleanup
      Object.values(actions).forEach(action => action.stop());
    };
  }, [actions]);

  return <primitive object={scene} />;
}

// Usage
<Model url="/model.glb" />
```

### Loading Textures
```javascript
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function TexturedSphere() {
  const [colorMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
    '/color.jpg',
    '/normal.jpg',
    '/roughness.jpg'
  ]);

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </mesh>
  );
}
```

### Loading HDR Environments
```javascript
import { Environment, useEnvironment } from '@react-three/drei';

// Using presets
<Environment preset="sunset" />

// Using custom HDR
<Environment files="/environment.hdr" />

// Using in components
function MyComponent() {
  const envMap = useEnvironment({ preset: 'sunset' });
  return (
    <mesh>
      <sphereGeometry />
      <meshStandardMaterial envMap={envMap} />
    </mesh>
  );
}
```

### Loading Management
```javascript
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';

function LoadingFallback() {
  return <div>Loading 3D model...</div>;
}

function App() {
  return (
    <Canvas>
      <Suspense fallback={<LoadingFallback />}>
        <Model url="/model.glb" />
      </Suspense>
    </Canvas>
  );
}

// Preloading outside React
const model = useLoader(GLTFLoader, '/model.glb');
```

## Interaction

### Raycasting (Mouse Interaction)
```javascript
import { useThree } from '@react-three/fiber';

function InteractiveMesh() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { camera, scene } = useThree();

  const handleClick = (event) => {
    // Raycasting is automatic with event handlers
    console.log('Clicked at:', event.point);
  };

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}
```

### Camera Controls
```javascript
import { OrbitControls, MapControls, FirstPersonControls } from '@react-three/drei';

// Orbit controls (rotate around target)
<OrbitControls
  enableZoom={true}
  enablePan={true}
  enableRotate={true}
  minDistance={2}
  maxDistance={20}
/>

// Map controls (like Google Maps)
<MapControls />

// First person controls (FPS-style)
<FirstPersonControls />

// Custom camera movement
function CustomCamera() {
  const { camera } = useThree();
  const { x, y } = useMouse();

  useFrame(() => {
    camera.position.x = x * 5;
    camera.position.y = y * 5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
```

## Performance Optimization

### Key Optimizations
1. **Use instancing** for repeated objects
2. **Reduce polygon count** on geometries
3. **Use texture compression** (KTX2, Draco)
4. **Enable frustum culling** (automatic)
5. **Use LOD (Level of Detail)**
6. **Optimize render loop**
7. **Use requestAnimationFrame properly**

### Instancing Example
```javascript
// Instead of 1000 individual meshes
for (let i = 0; i < 1000; i++) {
  scene.add(new THREE.Mesh(geometry, material));
}

// Use instancing
const instancedMesh = new THREE.InstancedMesh(geometry, material, 1000);
scene.add(instancedMesh);
```

### Level of Detail (LOD)
```javascript
import { LOD } from '@react-three/drei';

function LODMesh() {
  return (
    <LOD distances={[0, 10, 20]}>
      <mesh geometry={highPolyGeometry} />
      <mesh geometry={mediumPolyGeometry} />
      <mesh geometry={lowPolyGeometry} />
    </LOD>
  );
}
```

### Render Optimization
```javascript
// Pause rendering when not needed
const [render, setRender] = useState(true);

useFrame(() => {
  if (!render) return;
  // Update scene
});

// Reduce pixel ratio on mobile
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Enable shadow map only when needed
renderer.shadowMap.enabled = false; // Disable for performance
```

## Best Practices

### DO
- Use instancing for repeated objects
- Optimize textures (compress, resize)
- Use appropriate geometry detail
- Clean up resources (dispose geometries, materials)
- Use react-three-fiber hooks properly
- Test performance on mobile devices
- Use proper lighting techniques

### DON'T
- Create too many draw calls
- Use excessively high-poly models
- Forget to dispose of resources
- Use complex shaders unnecessarily
- Ignore mobile performance
- Create too many lights
- Use large textures without optimization

### Resource Cleanup
```javascript
useEffect(() => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial();

  return () => {
    geometry.dispose();
    material.dispose();
  };
}, []);
```

## Debugging

### Stats and Helpers
```javascript
import { Stats, Grid, AxesHelper } from '@react-three/drei';

<Stats />
<Grid />
<AxesHelper />
```

### Browser DevTools
```javascript
// Log scene graph
console.log(scene);

// Inspect object properties
console.log(mesh.geometry.attributes.position);
console.log(mesh.material);

// Performance monitoring
const stats = new Stats();
document.body.appendChild(stats.dom);
```

## Resources

- Three.js docs: https://threejs.org/docs/
- React Three Fiber docs: https://docs.pmnd.rs/react-three-fiber
- React Three Drei: https://pmndrs.github.io/drei/
- React Three Rapier: https://pmndrs.github.io/react-three-rapier/
- Three.js examples: https://threejs.org/examples/
