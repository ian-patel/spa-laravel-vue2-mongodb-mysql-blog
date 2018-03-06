import Vue from 'vue';
import routes from './routes';
import Router from 'vue-router';

Vue.use(Router);

/**
 * Create a new router instance.
 *
 * @param  {Array} routes
 * @return {Router}
 */
const router = new Router({
  routes,
  scrollBehavior,
  mode: 'history'
})

// Change page title by using routes meta
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' · ' + 'Blog';
  } else {
    document.title = 'Blog';
  }
  next();
});

/**
 * Apply beforeEnter guard to the routes.
 *
 * @param  {Array} routes
 * @param  {Function} beforeEnter
 * @return {Array}
 */
function beforeEnter (routes, beforeEnter) {
  return routes.map(route => {
    return { ...route, beforeEnter }
  });
}

/**
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
  return savedPosition || { x: 0, y: 0 };
}

// sync(store, router);

export default router;

