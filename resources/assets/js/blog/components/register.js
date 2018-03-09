import Vue from 'vue';
import Card from './Card';
import Posts from './Posts';
import Topbar from './Topbar';

// Third party
import speakingurl from 'speakingurl';
import VTooltip from 'v-tooltip';
import VueLazyload from 'vue-lazyload';
import InfiniteLoading from 'vue-infinite-loading';

Vue.component('app-card', Card);
Vue.component('app-posts', Posts);
Vue.component('app-topbar', Topbar);

// Third party
Vue.use(speakingurl);
Vue.use(VTooltip);
Vue.use(VueLazyload);
Vue.component('infinite-loading', InfiniteLoading);
