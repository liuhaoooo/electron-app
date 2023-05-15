<script setup lang="ts">
import { reactive } from 'vue'
const buttonConfig = reactive({
  autoInsertSpace: true,
})
</script>

<template>
  <el-config-provider size="large" :button="buttonConfig" v-loading.fullscreen.lock>
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>

</style>
