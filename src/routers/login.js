import { emptyContainer } from '../app/utils';
import { init } from '../widgets/login/manage';
// import template from '../html/login/main';

export default function () {
  //emptyContainer();
  $('#app').empty();
  init();
  // const view = new kendo.View(template, { wrap: false });
  // layout.showIn('#container', view);
}
