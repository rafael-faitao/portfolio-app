"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default function HeroBg() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    let camera;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.outerWidth, window.outerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Postprocessing: Bloom
    const composer = new EffectComposer(renderer);
      composer.renderer.setClearColor(0x000000, 0); // Also set composer to transparent

    camera = new THREE.OrthographicCamera(
      -12 * (window.innerWidth / window.innerHeight) / 2,
      12 * (window.innerWidth / window.innerHeight) / 2,
      12 / 2,
      -12 / 2,
      0.1,
      1000
    );
  camera.position.set(12, 12, 10); // Move camera to top-right and above
  camera.lookAt(0, 0, 0);         // Look at the center
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.2, 0.6, 0.01
    ));

    // Cube geometry and material
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const edgeGeometry = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    // Helper to add Angular logo
    function addLogo(parent) {
      const loader = new THREE.TextureLoader();
      const angularTexture = loader.load('/images/ang.svg');
      const logoMaterial = new THREE.MeshBasicMaterial({ map: angularTexture, transparent: true });
      const logoPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.7), logoMaterial);
      logoPlane.position.set(0, 0, -0.075);
      parent.add(logoPlane);
    }

    // Top-right cube
    const cube1 = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    cube1.position.set(6.8*2, 6.8*2, 0);
  cube1.rotation.x = 0;
  cube1.rotation.y = 0;
  cube1.rotation.z = 0;
    scene.add(cube1);
    addLogo(cube1);

    // Bottom-right T-shaped block
    const cube3 = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    cube3.position.set(16, 5, 0);
  cube3.rotation.x = 0;
  cube3.rotation.y = 0;
  cube3.rotation.z = 0;
    scene.add(cube3);
    addLogo(cube3);
    // T children
    const tChildTop = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    tChildTop.position.set(0, 1, 0);
    cube3.add(tChildTop);
    const tChildLeft = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    tChildLeft.position.set(-1, 0, 0);
    cube3.add(tChildLeft);
    const tChildRight = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    tChildRight.position.set(1, 0, 0);
    cube3.add(tChildRight);

    // Bottom-left L-shaped block
    const cube2 = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    cube2.position.set(-16, -14, 0);
  cube2.rotation.x = 0;
  cube2.rotation.y = 0;
  cube2.rotation.z = 0;
    scene.add(cube2);
    addLogo(cube2);
    // L children
    const lChildTop2 = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    lChildTop2.position.set(0, 1, 0);
    cube2.add(lChildTop2);
    const lChildTop1 = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    lChildTop1.position.set(0, 2, 0);
    cube2.add(lChildTop1);
    const lChildRight = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    lChildRight.position.set(1, 0, 0);
    cube2.add(lChildRight);

    // Animation
    let mouseX = 0, mouseY = 0;
  let targetRotX = [0, 0, 0];
  let targetRotY = [0, 0, 0];
  let baseRotZ = [0, 0, 0];
    const cubes = [cube1, cube2, cube3];

    function animate() {
      cubes.forEach((cube, i) => {
        cube.rotation.x += (targetRotX[i] - cube.rotation.x) * 0.01;
        cube.rotation.y += (targetRotY[i] - cube.rotation.y) * 0.01;
        cube.rotation.z = baseRotZ[i];
      });
      composer.render();
      requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      camera.left = -12 * (window.innerWidth / window.innerHeight) / 2;
      camera.right = 12 * (window.innerWidth / window.innerHeight) / 2;
      camera.top = 12 / 2;
      camera.bottom = -12 / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    function handleMouseMove(event) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      targetRotX = [
        Math.PI * 0.18 + mouseY * 0.2,
        Math.PI * 0.18 + mouseY * 0.2,
        Math.PI * 0.18 + mouseY * 0.2
      ];
      targetRotY = [
        -Math.PI * 0.18 + mouseX * 0.2,
        Math.PI * 0.18 + mouseX * 0.2,
        0 + mouseX * 0.2
      ];
    }
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 0, background: 'transparent' }} />;
}
