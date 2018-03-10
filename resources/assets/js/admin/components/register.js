import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'

import LeftSidebar from './layout/LeftSidebar.vue';
import PageContainer from './layout/PageContainer.vue';
import SidebarLayout from './layout/SidebarLayout.vue';
import InfiniteLoading from 'vue-infinite-loading';

Vue.component('left-sidebar', LeftSidebar);
Vue.component('page-container', PageContainer);
Vue.component('sidebar-layout', SidebarLayout);

Vue.use(ElementUI, { locale });
Vue.component('infinite-loading', InfiniteLoading);