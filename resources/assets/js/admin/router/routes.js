import Admin from 'app/admin/components/Admin';
import Login from 'app/admin/pages/Login.vue';

// routes
const routes = [
  {
    path: '/admin', component: Admin,
    children: [
      {
        path: 'login', component: Login
      },
    ]
  },
];

export default routes;
