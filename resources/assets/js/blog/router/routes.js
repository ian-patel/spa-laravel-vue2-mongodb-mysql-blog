import Home from 'app/blog/pages/Home.vue';
import Post from 'app/blog/pages/Post.vue';

// routes
let routes = [
  {
    path: '/',
    name: 'home',
    component : Home
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: Post,
    meta: { 
      title: 'Post'
    }, 
    props: true
  },
];

export default routes;
