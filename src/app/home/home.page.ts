import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
// @ts-ignore
import ThreeMeshUI from "three-mesh-ui";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild("container") m_Container: ElementRef;
  private m_Renderer: THREE.Renderer;
  private m_Scene: THREE.Scene;
  private m_Camera: THREE.Camera;

  constructor() {}

  ngAfterViewInit() {
    this.m_Scene = new THREE.Scene();
    this.m_Camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.m_Renderer = new THREE.WebGLRenderer();
    this.m_Renderer.setSize( window.innerWidth, window.innerHeight );
    this.m_Container.nativeElement.appendChild(this.m_Renderer.domElement);

    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    let cube = new THREE.Mesh( geometry, material );
    cube.position.set(2.5, 0, 0);
    this.m_Scene.add(cube);

    try {
      let block = new ThreeMeshUI.Block({
        width: 2.0,
        height: 2.0,
        backgroundColor: new THREE.Color("yellow")
      });
      this.m_Scene.add(block);
    }
    catch(error) {
      console.error(error);
      alert(error);
    }

    this.m_Camera.position.z = 5;

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    ThreeMeshUI.update();
    this.m_Renderer.render(this.m_Scene, this.m_Camera);
  }
}
