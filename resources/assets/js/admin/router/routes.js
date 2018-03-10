import Post from 'app/admin/Pages/Post';
import User from 'app/admin/Pages/User';
import Login from 'app/admin/pages/Login';
import Admin from 'app/admin/components/Admin';
import Category from 'app/admin/Pages/Category';
import PostView from 'app/admin/components/PostView';
import AdminLayout from 'app/admin/components/layout/AdminLayout';

// routes
const routes = [
  {
    path: '/admin', component: Admin,
    children: [
      {
        path: 'login',
        component: Login,
        name: 'login',
        meta: { title: 'Login' },
      },
      {
        path: '/',  component: AdminLayout,
        meta: {
          auth: true,
        },
        children: [
          {
            path: '/',
            name: 'dashboard',
            component: { render: h => h('div', 'Dashboard') },
            meta: { title: 'Dashboard', auth: true },
          },
          {
            path: 'categories',
            name: 'categories',
            component: Category,
            meta: { title: 'Categories', auth: true },
          },
          {
            path: 'users',
            name: 'users',
            component: User,
            meta: { title: 'Users', auth: true },
          },
          {
            path: 'posts',
            name: 'posts',
            component: Post,
            meta: { title: 'Posts', auth: true },
          },
          {
            name: 'post',
            path: 'posts/edit/:id',
            component: PostView,
            meta: { title: 'Posts', auth: true },
            props: true,
          },
          {
            name: 'addPost',
            path: 'posts/add',
            component: PostView,
            meta: { title: 'Posts', auth: true },
            props: true,
          }
        ]
      },
    ]
  },
];

export default routes;
