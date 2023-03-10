import { Injectable } from '@angular/core';
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Camera,
  Color,
  CylinderGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  RepeatWrapping,
  Scene,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { Water } from 'three/examples/jsm/objects/Water';

@Injectable()
export class GraphicsService {
  initGraphics(containerEl: HTMLDivElement) {
    const camera = new PerspectiveCamera(
      55,
      containerEl.offsetWidth / containerEl.offsetHeight,
      1,
      20000
    );

    const scene = new Scene();
    scene.background = new Color('#eeeeee');

    camera.position.set(30, 30, 100);

    const water = this.createWater();
    scene.add(water);

    const installationObjects = this.createInstallationObjects();
    scene.add(...installationObjects);

    const renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerEl.offsetWidth, containerEl.offsetHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = ACESFilmicToneMapping;

    const { environment, sky } = this.createSky(renderer, water);
    scene.environment = environment;
    scene.add(sky);

    this.createOrbitControls({ camera, renderer });

    this.animate(() => renderer.render(scene, camera), water);

    return { canvas: renderer.domElement };
  }

  private animate(render: () => void, water: Water) {
    requestAnimationFrame(() => this.animate(render, water));
    water.material.uniforms['time'].value += 0.5 / 60.0;
    render();
  }

  private createWater() {
    var waterGeometry = new PlaneGeometry(10000, 10000);

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new TextureLoader().load(
        '/assets/images/waternormals.jpg',
        function (texture) {
          texture.wrapS = texture.wrapT = RepeatWrapping;
        }
      ),
      alpha: 1.0,
      sunDirection: new Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
    });

    water.rotation.x = -Math.PI / 2;

    return water;
  }

  private createSky(renderer: WebGLRenderer, water: Water) {
    const sun = new Vector3();

    const sky = new Sky();
    sky.scale.setScalar(10000);

    const skyUniforms = sky.material.uniforms;

    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    const parameters = {
      elevation: 2,
      azimuth: 150,
    };

    const pmremGenerator = new PMREMGenerator(renderer);

    const phi = MathUtils.degToRad(90 - parameters.elevation);
    const theta = MathUtils.degToRad(parameters.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    sky.material.uniforms['sunPosition'].value.copy(sun);
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();

    const renderTarget = pmremGenerator.fromScene(sky as unknown as Scene);

    return { environment: renderTarget.texture, sky };
  }

  private createOrbitControls({
    camera,
    renderer,
  }: {
    camera: Camera;
    renderer: WebGLRenderer;
  }) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 10, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 500.0;
    controls.update();
  }

  private createInstallationObjects() {
    const cylinderGeometry = new CylinderGeometry(2.5, 2, 20);
    const material = new MeshStandardMaterial({ roughness: 0 });
    const cylinder1 = new Mesh(cylinderGeometry, material);
    cylinder1.position.x = -10;
    cylinder1.position.z = -10;
    cylinder1.position.y = 10;
    const cylinder2 = new Mesh(cylinderGeometry, material);
    cylinder2.position.x = 10;
    cylinder2.position.z = -10;
    cylinder2.position.y = 10;
    const cylinder3 = new Mesh(cylinderGeometry, material);
    cylinder3.position.x = -10;
    cylinder3.position.z = 10;
    cylinder3.position.y = 10;
    const cylinder4 = new Mesh(cylinderGeometry, material);
    cylinder4.position.x = 10;
    cylinder4.position.z = 10;
    cylinder4.position.y = 10;

    const floorGeometry = new BoxGeometry(30, 1, 30);
    const floor = new Mesh(floorGeometry, material);
    floor.position.y = 20.5;

    const buildingGeometry = new BoxGeometry(10, 5, 15);
    const building = new Mesh(buildingGeometry, material);
    building.position.y = 23.5;
    building.position.x = -9;
    building.position.z = -6.5;

    return [cylinder1, cylinder2, cylinder3, cylinder4, floor, building];
  }
}
