import { emptyContainer } from '../app/utils';
import { initTable } from '../widgets/tasks/manage';
import template from '../html/projects/main';

export default function () {
  emptyContainer();
  $('#container').html(template);


  initTable('#table_projects');
}
