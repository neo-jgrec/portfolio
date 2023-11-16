import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import * as THREE from 'three';

function Teapot({ tess, bottom, lid, body, fitLid, nonblinn, shading }) {
  const { camera, gl, scene } = useThree();
  const ref = useRef();
  const geom = useMemo(() => new TeapotGeometry(3, tess, bottom, lid, body, fitLid, nonblinn), [
    tess,
    bottom,
    lid,
    body,
    fitLid,
    nonblinn,
  ]);

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  const handleMouseDown = (event) => {
    isDragging = true;
    previousMousePosition = {
      x: (event.clientX / gl.domElement.clientWidth) * 2 - 1,
      y: -(event.clientY / gl.domElement.clientHeight) * 2 + 1,
    };
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const currentMousePosition = {
        x: (event.clientX / gl.domElement.clientWidth) * 2 - 1,
        y: -(event.clientY / gl.domElement.clientHeight) * 2 + 1,
      };

      const delta = {
        x: currentMousePosition.x - previousMousePosition.x,
        y: currentMousePosition.y - previousMousePosition.y,
      };

      ref.current.rotation.x += delta.y * 2 * Math.PI;
      ref.current.rotation.y += delta.x * 2 * Math.PI;

      previousMousePosition = currentMousePosition;
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  useEffect(() => {
    camera.position.z = 10;
    camera.updateProjectionMatrix();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    gl.domElement.addEventListener('mousedown', handleMouseDown);
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('mouseup', handleMouseUp);
    return () => {
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('mouseup', handleMouseUp);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, gl.domElement, scene]);

  return (
    <>
      <mesh ref={ref}>
        <meshPhongMaterial specular="#fff" shininess={shading === 'glossy' ? 100 : 0} />
        <bufferGeometry attach="geometry" {...geom} />
      </mesh>
    </>
  );
}

function Presentation() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-6xl px-4 mx-auto md:px-8 mt-28">
      <p className="text-4xl lg:text-6xl font-bold text-white">It's your time to shine.</p>
      <p className="text-lg lg:text-3xl text-gray-400">Jean-Yanis Jeffroy will write your lines.</p>

      <div>
        <p className="text-lg lg:text-3xl text-gray-400 mt-10">I'm a <span className="text-white">full-stack developer</span> and <span className="text-white">computer science student</span> at <a href="https://www.epitech.eu/" target="_blank" rel="noreferrer noopener" className="text-blue-400 hover:text-blue-500 transition duration-100 ease-in-out">Epitech</a>.</p>
        <p className="text-lg lg:text-3xl text-gray-400">A passionate about <span className="text-white">open-source</span> and <span className="text-white">web development</span>.</p>
        <p className="text-lg lg:text-3xl text-gray-400">A polyglot, I speak <span className="text-white">French</span>, <span className="text-white">English</span> and <span className="text-white">C</span>, <span className="text-white">JS</span>, <span className="text-white">Python</span> as well; and a lot more.</p>
      </div>

      {(!isMobile && window.innerWidth > 768) && (
        <div className="invisible md:visible">
          <p className="text-lg lg:text-3xl text-gray-400 mt-10">also,&nbsp;
            <a
              href="https://developer.mozilla.org/docs/Web/HTTP/Status/418"
              target="_blank" rel="noreferrer noopener"
              className="text-xl text-blue-400 hover:text-blue-500 transition duration-100 ease-in-out bg-gray-900 px-2 py-1 rounded-md"
            >
              418 I'm a teapot
            </a>
          </p>
          <Canvas className="w-full h-full mt-10" camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={1.0} />
            <Teapot tess={15} bottom={true} lid={true} body={true} fitLid={true} nonblinn={false} shading="glossy" />
          </Canvas>
        </div>
      )}

      <a href="/resume" className="font-medium lg:text-xl text-lg text-primary hover:text-blue-400 transition duration-100 ease-in-out mt-10">See my Curriculum Vitae →</a>

    </div>
  );
}

export default Presentation;
