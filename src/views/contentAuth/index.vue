<template>
  <div>
    <el-button v-permission="['admin']">仅admin可以看到</el-button>
    <el-button v-permission="['admin', 'user']">admin和user都可以看见</el-button>
  </div>
</template>

<script>
export default {};
</script>

