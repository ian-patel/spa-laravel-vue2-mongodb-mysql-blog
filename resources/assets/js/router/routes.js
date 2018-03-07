import Home from 'app/pages/Home.vue';
import Post from 'app/pages/Post.vue';

// routes
let routes = [
  {
    path: '/',
    name: 'home',
    component : Home
  },
  {
    path: '/posts/:slug--:id',
    name: 'post',
    component: Post,
    meta: { 
      title: 'Post'
    }, 
    props: true
  },
];

export default routes;
