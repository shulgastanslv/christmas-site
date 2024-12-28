'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function ChristmasTree() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Устанавливаем размер и центрируем канвас
    renderer.setSize(800, 800);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.left = '50%';
    renderer.domElement.style.top = '50%';
    renderer.domElement.style.transform = 'translate(-50%, -50%)';
    
    mountRef.current.appendChild(renderer.domElement);

    // Улучшенные настройки контролов
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minPolarAngle = Math.PI / 4;

    camera.position.z = 12;
    camera.position.y = 5;

    // Улучшенный ствол
    const trunkGeometry = new THREE.CylinderGeometry(0.4, 0.6, 4, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3d1f00,
      roughness: 0.7,
      metalness: 0.1
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = -3.6;
    scene.add(trunk);

    // Создание треугольных ярусов с иголками
    const createLayer = (y: number, scale: number) => {
      // Основной конус яруса
      const coneGeometry = new THREE.ConeGeometry(scale, 1.2, 4, 1, true);
      const coneMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0f8f3c,
        roughness: 0.6,
        metalness: 0.2
      });
      const cone = new THREE.Mesh(coneGeometry, coneMaterial);
      cone.position.y = y;
      cone.rotation.y = Math.PI / 4; // поворот для лучшей ориентации граней
      scene.add(cone);

      // Добавление иголок
      const needlesCount = 100;
      for (let i = 0; i < needlesCount; i++) {
        const needleGeometry = new THREE.CylinderGeometry(0.01, 0, 0.2, 4);
        const needleMaterial = new THREE.MeshStandardMaterial({
          color: 0x0f7c3d,
          roughness: 0.7
        });
        const needle = new THREE.Mesh(needleGeometry, needleMaterial);
        
        // Случайное расположение иголок
        const angle = Math.random() * Math.PI * 2;
        const radiusScale = Math.random() * 0.3 + 0.7; // 0.7-1.0 от размера яруса
        const radius = scale * radiusScale;
        
        needle.position.x = Math.cos(angle) * radius;
        needle.position.z = Math.sin(angle) * radius;
        needle.position.y = y + Math.random() * 0.8 - 0.4;
        
        // Случайный наклон иголок
        needle.rotation.x = (Math.random() - 0.5) * 1.5;
        needle.rotation.z = (Math.random() - 0.5) * 1.5;
        
        scene.add(needle);
      }
    };

    // Создание четырех ярусов разного размера
    createLayer(2.4, 1.6);    // верхний ярус
    createLayer(0.8, 2.6);    // второй ярус
    createLayer(-0.8, 3.6);   // третий ярус
    createLayer(-2.4, 4.6);   // нижний ярус

    // Улучшенные игрушки
    const createOrnament = (x: number, y: number, z: number, color: number) => {
      const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 32);
      const sphereMaterial = new THREE.MeshPhysicalMaterial({ 
        color: color,
        metalness: 1.0,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: color,
        emissiveIntensity: 0.8,
        reflectivity: 1.0
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(x, y, z);
      scene.add(sphere);
      return sphere; // Возвращаем шар для анимации
    };

    // Больше игрушек
    const ornaments: THREE.Mesh[] = [];
    const ornamentColors = [0xff0000, 0xffd700, 0x00ff00, 0xff69b4, 0x0000ff, 0xff4500];
    
    for (let i = 0; i < 40; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const layerIndex = Math.floor(Math.random() * 4); // Выбираем один из 4 ярусов
      let y, radius;
      
      switch(layerIndex) {
        case 0: // верхний ярус
          y = 2.4 + (Math.random() * 0.8 - 0.4);
          radius = Math.random() * 1.2;
          break;
        case 1: // второй ярус
          y = 0.8 + (Math.random() * 0.8 - 0.4);
          radius = Math.random() * 2.0;
          break;
        case 2: // третий ярус
          y = -0.8 + (Math.random() * 0.8 - 0.4);
          radius = Math.random() * 2.8;
          break;
        default: // нижний ярус
          y = -2.4 + (Math.random() * 0.8 - 0.4);
          radius = Math.random() * 3.6;
          break;
      }
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const color = ornamentColors[Math.floor(Math.random() * ornamentColors.length)];
      const ornament = createOrnament(x, y, z, color);
      ornaments.push(ornament);
    }

    // Улучшенная звезда
    const starGeometry = new THREE.OctahedronGeometry(0.3, 1);
    const starMaterial = new THREE.MeshPhysicalMaterial({ 
      color: 0xffd700,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xffd700,
      emissiveIntensity: 0.4
    });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.y = 2;
    scene.add(star);

    // Улучшенное освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 2.0);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffd700, 1.5);
    pointLight2.position.set(-5, 3, -5);
    scene.add(pointLight2);

    // Добавляем мерцание звезды и игрушек
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Мерцание игрушек
      ornaments.forEach((ornament, index) => {
        const material = ornament.material as THREE.MeshPhysicalMaterial;
        material.emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.002 + index * 0.5) * 0.5;
      });
      
      star.material.emissiveIntensity = 0.4 + Math.sin(Date.now() * 0.002) * 0.2;
      pointLight2.intensity = 0.8 + Math.sin(Date.now() * 0.001) * 0.2;
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Очистка
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full relative" />
  );
}