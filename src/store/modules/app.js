export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    settings: {
      fixedHeader: false
    }
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    }
  }
}