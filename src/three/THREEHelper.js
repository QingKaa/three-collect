import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

export default class  THREEHelper {
    constructor(id){
        this.id = id
        this.el = document.getElementById(id);
    }

    initThree(){
        let width = this.el.offsetWidth
        let height = this.el.offsetHeight
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
        this.camera.position.set(30, 30, 30)
        this.camera.lookAt(0, 0, 0)

        this.renderer = new THREE.WebGLRenderer({ antialias: true,alpha:true })
        this.renderer.setSize(width, height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.el.appendChild(this.renderer.domElement)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.update()

        window.addEventListener('resize', () => {
            let width = this.el.offsetWidth
            let height = this.el.offsetHeight
            this.camera.aspect = width / height
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(width, height)
        })
    }

    initHelper(size){
        this.scene.add(new THREE.AxesHelper(size || 100))
    }

    loaderModel(option){
        switch (option.type) {
            case 'gltf':
            case 'glb':
            if(!this.gltfLoader) {
                this.gltfLoader = new GLTFLoader()
                let dracoLoader = new DRACOLoader()
                dracoLoader.setDecoderPath('three/examples/libs/draco/')
                this.gltfLoader.setDRACOLoader(dracoLoader)
            }
            this.gltfLoader.load(option.url, option.onLoad, option.onProgress, option.onError)
            default:
                break;
        }
    }

    render(cb){
        cb && cb()
        window.requestAnimationFrame(this.render.bind(this, cb))
    }
}