<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import AppMain from "./components/AppMain/index";
import Sidebar from "./components/Sidebar/index";
import Navbar from "./components/Navbar/index";

export default {
  name: "Layout",
  components: {
    Sidebar,
    AppMain,
    Navbar,
  },
  setup() {
    const store = useStore();
    const sidebar = computed(() => store.state.app.sidebar);
    const fixedHeader = computed(() => store.state.app.settings.fixedHeader);
    const classObj = computed(() => ({
      hideSidebar: !sidebar.value.opened,
      openSidebar: sidebar.value.opened,
      withoutAnimation: sidebar.value.withoutAnimation,
    }));

    return { classObj, fixedHeader };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 50px);
}
</style>