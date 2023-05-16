<template>
  <div class="main">
    <div class="screen" id="screen"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import THREEHelper from "@/three/THREEHelper"

let threeHelper, renderer,scene, camera

export default {
  name: "HomeView",
  mounted(){
    this.initThree()
  },
  methods:{
    initThree(){
        threeHelper = new THREEHelper('screen')
        threeHelper.initThree()
        threeHelper.initHelper()

        scene = threeHelper.scene
        camera = threeHelper.camera
        renderer = threeHelper.renderer

        threeHelper.render(() => {
            renderer.render(scene, camera)
        })
    }
  }
};
</script>

<style lang="scss">
.main{
    width: 100%;
    height: 100vh;
    background-color: #000;
}
.screen{
    width: 100%;
    height: 100%;
}
</style>
