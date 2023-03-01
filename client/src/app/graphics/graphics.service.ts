import { Injectable } from '@angular/core';
import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

@Injectable()
export class GraphicsService {
  initGraphics(containerEl: HTMLDivElement) {
    const camera = new PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.2,
      2000
    );

    const scene = new Scene();
    scene.background = new Color('#eeeeee');

    camera.position.set(-14, 8, 16);

    const renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerEl.offsetWidth, containerEl.offsetHeight);
    renderer.shadowMap.enabled = true;
    renderer.render(scene, camera);

    return { canvas: renderer.domElement };
  }
}
