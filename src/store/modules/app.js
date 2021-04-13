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
    TOGGLE_SIDEBAR(state) {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    CHANGE_SETTINGS: (state, { key, value }) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state.settings[key] = value;
      }
    },
  }
}