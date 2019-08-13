
import { getLocalStorage, clickMenuEvent } from './utils';
import { create as createNotifHub } from '../hubs/notifications';

import routerLogin from '../routers/login';
import routerProjects from '../routers/projects';
import routerUsers from '../routers/users';
import routerUserId from '../routers/userId';
import routerTasks from '../routers/tasks';

import layoutTemplate from '../html/layout';


const layout = new kendo.Layout('<div id="container"></div>', {
  wrap: false,
});

function onNotifReceived(res) {
  console.info('Yayyyyy, I just received a notification!!!', res);
}


const router = new kendo.Router({
  change: function (e) {
    const authData = getLocalStorage('auth');
    const timestamp = new Date().getTime() / 1000;

    if (authData == null || authData.expiration < timestamp) {
      routerLogin();
      return;
    }
    if ($('.navbar-nav').length === 0) {
      const $app = $('#app');

      $app.empty();
      $app.append(layoutTemplate);
      clickMenuEvent();
      createNotifHub(authData.token);
    }
  }
});

router.bind('init', () => {
  layout.render($('#app'));
});

router.route('/', () => {
  const authData = getLocalStorage('auth');
  if (authData !== null) router.navigate("/tasks");
  //routerLogin();
});

router.route('/projects', () => {
  routerProjects();
});

router.route('/tasks', () => {
  routerTasks();
});


router.route('/users', () => {
  routerUsers();
});

router.route('/users/:id', (id) => {
  routerUserId(id);
});

router.route('/logout', () => {
  localStorage.removeItem('auth');
  router.navigate("/");
});


router.start();


export {
  layout,
  router
}
