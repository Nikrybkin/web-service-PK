import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/customers', component: () => import('pages/Customers/Customers.vue') },
      { path: '/customers/:id', component: () => import('pages/Customers/Customer.vue')
      },
      { path: '/deliveries', component: () => import('pages/Deliveries/Deliveries.vue') },
      { path: '/deliveries/:id', component: () => import('pages/Deliveries/Delivery.vue')
      },
      { path: '/products', component: () => import('pages/Products/Products.vue') },
      { path: '/products/:id', component: () => import('pages/Products/Product.vue')
      },
      { path: '/orders', component: () => import('pages/Orders/Orders.vue') },
      { path: '/orders/:id', component: () => import('pages/Orders/Order.vue')
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
