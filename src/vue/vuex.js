import Vue from 'vue';

class Store {
  constructor(options = { state, getters = {}, mutations = {}, actions = {} }) {
    this.vm = new Vue({
      data: {
        state
      }
    });

    // 实现 getters
    this.getters = {};
    Object.keys(getters).forEach(getterName => {
      Object.defineProperty(this.getters, getterName, {
        get() {
          return getters[getterName](this.state)
        }
      });
    });

    // 实现 mutations
    this.mutations = {};
    Object.keys(mutations).forEach(mutationName => {
      this.mutations[mutationName] = (payload) => {
        mutations[mutationName](this.state, payload);
      }
    });

    // 实现 actions
    this.actions = {};
    Object.keys(actions).forEach(actionName => {
      this.actions[actionName] = (payload) => {
        actions[actionName](this, payload);
      }
    });
  }

  get state() {
    return this.vm.state;
  }

  commit(mutationName, payload) {
    this.mutations[mutationName](payload)
  }

  dispatch(actionName, payload) {
    this.actions[actionName](payload)
  }
}

const install = function(Vue) {
  Vue.mixin({
    beforeCreate() {
      // 判断是根组件
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

const Vuex = {
  Store,
  install
}

export default Vuex
