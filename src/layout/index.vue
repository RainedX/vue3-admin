<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar/index.vue";
import { useStore } from 'vuex'
import { computed } from 'vue';
export default {
  name: 'Layout',
  components: {
    Sidebar
  },
  setup() {
    const store = useStore()
    const sidebar = computed(() => store.state.app.sidebar)

    const classObj = computed(() => ({
      hideSidebar: !sidebar.value.opened,
      openSidebar: sidebar.value.opened
    }))


    return { classObj }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  @include relative;
}
</style>