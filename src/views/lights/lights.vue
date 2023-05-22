<template>
    <div class="main">
        <div class="screen" id="screen"></div>
    </div>
</template>

<script>
import THREEHelper from "@/three/THREEHelper"
import * as THREE from 'three'
let threeHelper, renderer,scene, camera,gui
const clock = new THREE.Clock()

export default {
  name: "ThreeCollectLights",
  data(){
    return {
        material:null,
        sphere: null,
        torus: null,
        box:null,
        textureLoader:null,
        userAvatarTexture:null,
    }
  },
  mounted(){
    this.initThree()
    this.initObjects()
    this.initLights()
    this.animate()
  },
  methods:{
    initThree(){
        threeHelper = new THREEHelper('screen')
        threeHelper.initThree()
        threeHelper.initHelper()
        gui = threeHelper.initGUI()

        scene = threeHelper.scene
        camera = threeHelper.camera
        renderer = threeHelper.renderer
    },
    initLights(){
        const lightFolder = gui.addFolder('lights')
        // 环境光
        const environmentLight = new THREE.AmbientLight(0xffffff, 0.5)
        lightFolder.add(environmentLight, 'intensity').min(0).max(1).step(0.01).name('Ambient-intensity')
        lightFolder.addColor(environmentLight, 'color').name('Ambient-color')
        scene.add(environmentLight)

        // 平行光
        const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5)
        directionalLight.position.set(1, 0.25, 0)
        scene.add(directionalLight)

        // 半球光
        const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
        scene.add(hemisphereLight)

        // 点光
        const pointLine = new THREE.PointLight(0xff9000, 0.5)
        pointLine.distance = 10
        pointLine.decay = 2

        pointLine.position.x = 1
        pointLine.position.y = -0.5
        pointLine.position.z = 1
        const pointLightFolder = gui.addFolder('pointLight-环境光')
        pointLightFolder.add(pointLine, 'distance').min(0).max(10).step(0.01)
        pointLightFolder.add(pointLine, 'decay').min(0).max(10).step(0.01)
        scene.add(pointLine)

        // 平面光光源
        const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 2, 2)
        rectAreaLight.position.set(-1.5, 0, 1.5)
        rectAreaLight.lookAt(new THREE.Vector3())
        scene.add(rectAreaLight)

        const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0, 1)
        spotLight.position.set(1.5,2,3)
        spotLight.target = this.box
        scene.add(spotLight)
    },
    initObjects(){

        this.material = new THREE.MeshStandardMaterial({  roughness: 0.4, metalness: 0.3,side: THREE.DoubleSide })
        gui.add(this.material, 'roughness').min(0).max(1).step(0.01)
        gui.add(this.material, 'metalness').min(0).max(1).step(0.01)

        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            this.material
        )
        ground.rotation.x = -Math.PI * 0.5
        ground.position.y = -1
        ground.Slide = 0.5
        scene.add(ground)

        this.sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), this.material)
        this.sphere.position.x = -1.5

        this.box  = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.material)
        this.box.position.x = 1.5
        scene.add(this.box)

        this.torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), this.material)

        scene.add(this.sphere, this.torus)
    },
    animate(){
        const elapsedTime = clock.getElapsedTime()

        this.sphere.rotation.y = 0.1 * elapsedTime
        this.box.rotation.y = 0.1 * elapsedTime
        this.torus.rotation.y = 0.1 * elapsedTime

        this.sphere.rotation.x = 0.15 * elapsedTime
        this.box.rotation.x = 0.15 * elapsedTime
        this.torus.rotation.x = 0.15 * elapsedTime

        window.requestAnimationFrame(this.animate)
        renderer.render(scene, camera)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>