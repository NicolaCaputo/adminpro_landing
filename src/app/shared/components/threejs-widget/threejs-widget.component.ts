import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-threejs-widget',
  standalone: false,
  templateUrl: './threejs-widget.component.html',
})
export class ThreejsWidgetComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animFrameId: number = 0;
  private particles!: THREE.Points;
  private ring1!: THREE.Mesh;
  private ring2!: THREE.Mesh;
  private ring3!: THREE.Mesh;
  private bars: THREE.Mesh[] = [];
  private barBaseY: number[] = [];
  private clock = new THREE.Clock();

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => this.initThree());
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth || 420;
    const height = canvas.clientHeight || 220;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x818cf8, 2);
    dirLight.position.set(5, 5, 5);
    this.scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 3, 15);
    pointLight1.position.set(-3, 2, 3);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa78bfa, 2, 12);
    pointLight2.position.set(3, -2, 2);
    this.scene.add(pointLight2);

    this.createParticles();
    this.createRings();
    this.createDataBars();
    this.animate();
  }

  private createParticles(): void {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.5,
    });
    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  private createRings(): void {
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7,
    });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      metalness: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: 0.5,
    });
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.15,
      transparent: true,
      opacity: 0.35,
    });

    this.ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.04, 16, 100), ringMat1);
    this.ring1.position.set(-2.2, 0, 0);
    this.ring1.rotation.x = Math.PI / 6;
    this.scene.add(this.ring1);

    this.ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.03, 16, 100), ringMat2);
    this.ring2.position.set(-2.2, 0, 0);
    this.ring2.rotation.x = Math.PI / 3;
    this.ring2.rotation.z = Math.PI / 5;
    this.scene.add(this.ring2);

    this.ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.025, 16, 100), ringMat3);
    this.ring3.position.set(-2.2, 0, 0);
    this.ring3.rotation.y = Math.PI / 4;
    this.scene.add(this.ring3);

    // Central sphere
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.9,
      roughness: 0.1,
    });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 32), sphereMat);
    sphere.position.set(-2.2, 0, 0);
    this.scene.add(sphere);
  }

  private createDataBars(): void {
    const data = [0.5, 0.8, 0.6, 1.0, 0.75, 0.9, 0.65];
    const colors = [0x6366f1, 0x818cf8, 0xa78bfa, 0x6366f1, 0x818cf8, 0xa78bfa, 0x6366f1];
    const barWidth = 0.22;
    const gap = 0.32;
    const startX = 0.6;

    data.forEach((h, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: colors[i],
        metalness: 0.4,
        roughness: 0.4,
        transparent: true,
        opacity: 0.85,
      });
      const geo = new THREE.BoxGeometry(barWidth, h * 2, 0.22);
      const mesh = new THREE.Mesh(geo, mat);
      const baseY = (h * 2) / 2 - 1;
      mesh.position.set(startX + i * gap, baseY, 0);
      this.scene.add(mesh);
      this.bars.push(mesh);
      this.barBaseY.push(baseY);
    });

    // X axis line
    const lineMat = new THREE.LineBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.4 });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.3, -1, 0),
      new THREE.Vector3(3.2, -1, 0),
    ]);
    this.scene.add(new THREE.Line(lineGeo, lineMat));
  }

  private animate(): void {
    this.animFrameId = requestAnimationFrame(() => this.animate());
    const t = this.clock.getElapsedTime();

    // Rotate rings
    this.ring1.rotation.y = t * 0.4;
    this.ring2.rotation.x = t * 0.3 + Math.PI / 6;
    this.ring2.rotation.z = t * 0.2 + Math.PI / 5;
    this.ring3.rotation.x = t * 0.5;
    this.ring3.rotation.z = t * 0.35;

    // Float particles gently
    this.particles.rotation.y = t * 0.03;
    this.particles.rotation.x = Math.sin(t * 0.05) * 0.05;

    // Animate bars with a wave
    this.bars.forEach((bar, i) => {
      const wave = Math.sin(t * 1.2 + i * 0.7) * 0.08;
      bar.scale.y = 1 + wave;
      bar.position.y = this.barBaseY[i] + wave * 0.15;
    });

    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrameId);
    this.renderer?.dispose();
  }
}
