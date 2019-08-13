import { emptyContainer } from '../app/utils';
import { initTable } from '../widgets/users/manage';
import template from '../html/users/main';

export default function () {
  emptyContainer();
  $('#container').html(template);


  initTable('#table_users');
}
