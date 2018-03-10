<template>
  <div class="sidebar-layout">
    <left-sidebar :title="title" :items="items" />
    <page-container class="sidebar-layout__content">
      <router-view />
    </page-container>
  </div>
</template>

<script>
import PageContainer from './PageContainer.vue';

export default {
  components: {
    PageContainer,
  },
  props: {
    title: {
      type: String,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/admin/helpers";

.sidebar-layout {
  display: flex;
  align-items: flex-start;

  &__content {
    flex: 1;
  }
}
</style>
