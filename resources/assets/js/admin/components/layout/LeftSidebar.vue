<template>
  <aside :class="['left-sidebar', `left-sidebar--${theme}`]">
    <slot name="header">
      <div v-if="title" class="left-sidebar__title">{{ title }}</div>
    </slot>
    <el-menu
      :default-active="activeMenu"
      class="left-sidebar__menu"
      v-bind="themeProps"
      router >
      <template v-for="item in items">
        <el-menu-item :index="item.name" :route="{ name: item.route }" :key="item.name">
          {{ item.icon }} {{ item.title }}
        </el-menu-item>
      </template>
    </el-menu>
    <div v-if="$slots.footer" class="left-sidebar__gap"></div>
    <div v-if="$slots.footer" class="left-sidebar__footer">
      <slot name="footer" />
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      default: 'light',
    },
    title: {
      type: String,
    },
  },

  computed: {
    themeProps() {
      if (this.theme === 'light') return;
      return {
        backgroundColor: '#434343',
        textColor: '#e2e2e2',
        activeTextColor: '#ffd04b',
      };
    },

    activeMenu() {
      const item = this.items.find(item => this.$route.matched.find(
        route => item.name === route.name || item.name === route.meta.menu
      ));
      if (item) return item.name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/admin/helpers";

.left-sidebar {
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  box-shadow: 0 0 1px 0 rgba(0,0,0,.2);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  display: flex;
  flex-direction: column;

  &--dark {
    background-color: #434343;
  }

  &--light {
    background-color: #fff;
  }

  &__title {
    display: flex;
    height: $top-header-height;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid $border-color;
    box-sizing: content-box;
    font-size: 14px;
  }

  &__menu {
    border-right: none;
  }

  &__gap {
    flex: 1 1;
  }

  &__footer {
    position: sticky;
    bottom: 0;
  }
}
</style>
