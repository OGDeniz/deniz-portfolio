import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-contact-mg',
  standalone: true,
  template: `<canvas #canvas class="mg-canvas"></canvas>`,
  styles: [`
    :host { display: block; width: 120%; height: 120%; }

    .mg-canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
})
export class ContactMgComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private animationId = 0;

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer?.dispose();
  }

  private init(): void {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth  || 480;
    const h = canvas.clientHeight || 480;

    /* ── scene ──────────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 2.6;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /* ── lights ─────────────────────────────────── */
    const keyLight = new THREE.PointLight(0x00c2d1, 4, 6);
    keyLight.position.set(0, 0.75, 2);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x8f5bff, 1.8, 6);
    fillLight.position.set(-1.5, -0.5, 1);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight(0x0e0f11, 0.6));

    /* ── canvas texture ─────────────────────────── */
    const tex = this.buildTexture();
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 7);
    tex.rotation = Math.PI * 0.5;

    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      emissiveMap: tex,
      emissive: new THREE.Color(0x00c2d1),
      emissiveIntensity: 0.35,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    /* ── geometry ───────────────────────────────── */
    const geo  = new THREE.CylinderGeometry(0.5, 0.5, 2, 80, 80, true);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.z = Math.PI * -0.5;
    scene.add(mesh);

    /* ── inner glow ring ────────────────────────── */
    const ringGeo = new THREE.TorusGeometry(0.48, 0.01, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00c2d1, transparent: true, opacity: 0.5 });
    const ringL   = new THREE.Mesh(ringGeo, ringMat);
    const ringR   = new THREE.Mesh(ringGeo, ringMat);
    ringL.position.x = -1;
    ringR.position.x =  1;
    scene.add(ringL, ringR);

    /* ── animate ────────────────────────────────── */
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.008;
      ringL.rotation.y += 0.005;
      ringR.rotation.y -= 0.005;
      this.renderer.render(scene, camera);
    };
    animate();
  }

  /** Draws a motion-graphics style strip onto an offscreen canvas. */
  private buildTexture(): THREE.CanvasTexture {
    const W = 512, H = 128;
    const c   = document.createElement('canvas');
    c.width   = W;
    c.height  = H;
    const ctx = c.getContext('2d')!;

    /* background */
    ctx.fillStyle = 'rgba(10, 11, 14, 0.9)';
    ctx.fillRect(0, 0, W, H);

    /* scanlines */
    for (let y = 0; y < H; y += 3) {
      ctx.fillStyle = 'rgba(0, 194, 209, 0.04)';
      ctx.fillRect(0, y, W, 1);
    }

    /* rows */
    const rows: { text: string; bright: boolean }[] = [
      { text: '·  CONTACT  ·  DY-DEV.DE  ·',       bright: true  },
      { text: 'FRONTEND  ·  ANGULAR  ·  REACT',      bright: false },
      { text: '·  TYPESCRIPT  ·  NEXT.JS  ·',        bright: true  },
      { text: 'UX / UI  ·  PERFORMANCE  ·  SEO',     bright: false },
    ];

    const rowH = H / rows.length;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.font         = 'bold 13px "Courier New", monospace';

    rows.forEach(({ text, bright }, i) => {
      const y = (i + 0.5) * rowH;

      /* subtle row bg */
      if (bright) {
        ctx.fillStyle = 'rgba(0, 194, 209, 0.06)';
        ctx.fillRect(0, i * rowH, W, rowH);
      }

      /* text */
      ctx.fillStyle = bright ? '#00e5f6' : 'rgba(0, 194, 209, 0.38)';
      ctx.fillText(text, W / 2, y);

      /* separator */
      ctx.strokeStyle = 'rgba(0, 194, 209, 0.14)';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(0,     (i + 1) * rowH);
      ctx.lineTo(W, (i + 1) * rowH);
      ctx.stroke();
    });

    /* vertical accent line */
    ctx.strokeStyle = 'rgba(143, 91, 255, 0.25)';
    ctx.lineWidth   = 1.5;
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();

    return new THREE.CanvasTexture(c);
  }
}
