import { emptyContainer } from '../app/utils';
import { init } from '../widgets/users/detailed';

export default function (id) {
  emptyContainer();
  init(id);
}
