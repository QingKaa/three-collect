<template>
    <div class="main">
        <div class="screen" id="screenMaterial"></div>
    </div>
</template>

<script>
import THREEHelper from "@/three/THREEHelper"
import * as THREE from 'three'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

let threeHelper, renderer,scene, camera,gui,stats
const clock = new THREE.Clock()

export default {
  name: "ThreeCollectMaterial",
  data(){
    return {
        material:null,
        sphere: null,
        plane: null,
        torus: null,
        textureLoader:null,
        userAvatarTexture:null,
        matcapTexture: null
    }
  },
  mounted(){
    this.initThree()
    this.initTexture()
    this.initFontLoader()
    this.animate()
  },
  methods:{
    initThree(){
        threeHelper = new THREEHelper('screenMaterial')
        threeHelper.initThree()
        threeHelper.initHelper()
        stats = threeHelper.initStats()
        gui = threeHelper.initGUI()

        scene = threeHelper.scene
        camera = threeHelper.camera
        renderer = threeHelper.renderer
    },
    initTexture(){
        this.textureLoader = new THREE.TextureLoader()
        this.matcapTexture = this.textureLoader.load("matcaps/8.png")
    },
    initGUi(){

    },
    animate(){
        const elapsedTime = clock.getElapsedTime()

        // this.sphere.rotation.y = 0.1 * elapsedTime
        // this.plane.rotation.y = 0.1 * elapsedTime
        // this.torus.rotation.y = 0.1 * elapsedTime

        // this.sphere.rotation.x = 0.15 * elapsedTime
        // this.plane.rotation.x = 0.15 * elapsedTime
        // this.torus.rotation.x = 0.15 * elapsedTime

        stats && stats.update()
        window.requestAnimationFrame(this.animate)
        renderer.render(scene, camera)
    },
    initFontLoader(){
        const fontLoader = new FontLoader()
        fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry(
                'Hello Three.js',
                {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 4
                }
            )
            // 设置在中点 （两种方式）
            // 1. 调用内置 center 方法
            textGeometry.center()
            // 3. 计算当前几何体的的边界矩形，该操作会更新已有 [param:.boundingBox]。
            // 边界矩形不会默认计算，需要调用该接口指定计算边界矩形，否则保持默认值 null。
            // textGeometry.computeBoundingBox() // 调用后 textGeometry.boundingBox 才会有值，否知为null
            // textGeometry.translate(
            //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
            //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
            //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
            // )
            // const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true })

            // MeshMatcapMaterial： 不对灯光作出反应。 它将会投射阴影到一个接受阴影的物体上(and shadow clipping works)，但不会产生自身阴影或是接受阴影。
            const material = new THREE.MeshMatcapMaterial({ matcap: this.matcapTexture })
            const text = new THREE.Mesh(textGeometry, material)
            scene.add(text)

            // 随机甜甜圈
            const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
            for(let i = 0; i < 200; i++){
                const donut = new THREE.Mesh(donutGeometry, material)
                donut.position.x = (Math.random() - 0.5) * 10
                donut.position.y = (Math.random() - 0.5) * 10
                donut.position.z = (Math.random() - 0.5) * 10
                donut.rotation.x = Math.random() * Math.PI
                donut.rotation.y = Math.random() * Math.PI
                const scale = Math.random()
                donut.scale.set(scale, scale, scale)
                scene.add(donut)
            }
        })
    },
  }
};
</script>

<style lang="scss" scoped>

</style>