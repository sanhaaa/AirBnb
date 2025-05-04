import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ArrowLeftCircle, ArrowRightCircle, Maximize2, Minimize2 } from 'lucide-react';

interface VRTourViewerProps {
  panoramas: string[];
}

// Sphere component for panorama
const PanoramaSphere = ({ texture }) => {
  const mesh = useRef();
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0005;
    }
  });
  
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  );
};

// Main VR Component
const VRTourViewer = ({ panoramas }: VRTourViewerProps) => {
  const [currentPanoIndex, setCurrentPanoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const nextPanorama = () => {
    setCurrentPanoIndex((prev) => (prev + 1) % panoramas.length);
  };
  
  const prevPanorama = () => {
    setCurrentPanoIndex((prev) => (prev - 1 + panoramas.length) % panoramas.length);
  };
  
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden ${
        isFullscreen ? 'w-screen h-screen' : 'w-full aspect-video'
      }`}
    >
      <Canvas>
        <Suspense fallback={null}>
          <PanoramaView url={panoramas[currentPanoIndex]} />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            autoRotate={false}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
      
      {/* Controls overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 rounded-full px-4 py-2 flex items-center space-x-3">
        <button 
          onClick={prevPanorama}
          className="text-white hover:text-airbnb-red transition-colors"
          aria-label="Previous view"
        >
          <ArrowLeftCircle size={24} />
        </button>
        
        <span className="text-white text-sm">
          {currentPanoIndex + 1} / {panoramas.length}
        </span>
        
        <button 
          onClick={nextPanorama}
          className="text-white hover:text-airbnb-red transition-colors"
          aria-label="Next view"
        >
          <ArrowRightCircle size={24} />
        </button>
      </div>
      
      {/* Fullscreen toggle */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
      </button>
      
      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-black/60 text-white text-xs rounded-md px-3 py-1">
        Drag to look around • Pinch or scroll to zoom
      </div>
    </div>
  );
};

// Component to load and display panorama
const PanoramaView = ({ url }) => {
  const texture = useLoader(TextureLoader, url);
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={75} />
      <PanoramaSphere texture={texture} />
    </>
  );
};

export default VRTourViewer;