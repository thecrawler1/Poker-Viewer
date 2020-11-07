
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: '/:spot/delete/', name: 'delete-spot', component: () => import('pages/DeleteSpot.vue') },
      { path: '/:spot/new/spot/', name: 'new-spot', component: () => import('pages/NewSpot.vue') },
      { path: '/:spot/new/item-caption/', name: 'new-item-caption', component: () => import('pages/NewItemCaption.vue') },
      { path: '/:spot/new/item-formation/', name: 'new-item-formation', component: () => import('pages/NewItemFormation.vue') },
      { path: '/:spot/:hero_position/:villain_position?/', name: 'range-viewer', component: () => import('pages/RangeViewer.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
