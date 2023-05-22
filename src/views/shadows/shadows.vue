<template>
    <div class="main">
        <div class="screen" id="screenMaterial"></div>
    </div>
</template>

<script>
import THREEHelper from "@/three/THREEHelper"
import * as THREE from 'three'
let threeHelper, renderer,scene, camera
const clock = new THREE.Clock()

export default {
  name: "ThreeCollectShadows",
  data(){
    return {
        material:null,
        sphere: null,
        plane: null,
        torus: null,
        textureLoader:null,
        userAvatarTexture:null
    }
  },
  mounted(){
    this.initThree()
    this.initObjects()
    this.initTexture()
    this.animate()
  },
  methods:{
    initThree(){
        threeHelper = new THREEHelper('screenMaterial')
        threeHelper.initThree()
        threeHelper.initHelper()

        scene = threeHelper.scene
        camera = threeHelper.camera
        renderer = threeHelper.renderer
    },
    initTexture(){
        this.textureLoader = new THREE.TextureLoader()
        this.userAvatarTexture = this.textureLoader.load("texture/default-avatar.png")
        this.material.map = this.userAvatarTexture
    },
    initObjects(){
        this.material = new THREE.MeshBasicMaterial({})
        this.sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), this.material)
        this.sphere.position.x = -1.5

        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.material)
        this.plane.position.x = 1.5
        
        this.torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), this.material)

        scene.add(this.sphere,this.plane,this.torus)
    },
    animate(){
        const elapsedTime = clock.getElapsedTime()

        this.sphere.rotation.y = 0.1 * elapsedTime
        this.plane.rotation.y = 0.1 * elapsedTime
        this.torus.rotation.y = 0.1 * elapsedTime

        this.sphere.rotation.x = 0.15 * elapsedTime
        this.plane.rotation.x = 0.15 * elapsedTime
        this.torus.rotation.x = 0.15 * elapsedTime

        window.requestAnimationFrame(this.animate)
        renderer.render(scene, camera)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>