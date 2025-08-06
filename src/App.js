import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJExporter } from 'three-stdlib';

import * as THREE from 'three';

function AvatarModel({ refMesh }) {
  return (
    <mesh ref={refMesh}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function App() {
  const avatarRef = useRef();

  const handleExport = () => {
    const exporter = new OBJExporter();
    const result = exporter.parse(avatarRef.current);
    const blob = new Blob([result], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'avatar.obj';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <AvatarModel refMesh={avatarRef} />
        <OrbitControls />
      </Canvas>
      <button
        onClick={handleExport}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          padding: '10px 20px',
          background: '#222',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}
      >
        Export .OBJ
      </button>
    </div>
  );
}
