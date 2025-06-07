import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'ZENITH TASKS',
    icon: 'Square',
    component: Home,
    path: '/'
  },
  notfound: {
    id: 'notfound',
    label: 'NOT FOUND',
    icon: 'AlertTriangle',
    component: NotFound,
    path: '*'
  }
};

export const routeArray = Object.values(routes);