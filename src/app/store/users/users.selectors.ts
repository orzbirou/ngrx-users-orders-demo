import { createSelector } from '@ngrx/store';
import { selectUsersState, selectUserEntities } from './users.reducer';
import { selectAllOrders } from '../orders/orders.reducer';
import { Order } from '../../models/user.model';

export const selectSelectedUserId = createSelector(
  selectUsersState,
  s => s.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, id) => (id != null ? entities[id] ?? null : null)
);

export const selectOrdersForSelectedUser = createSelector(
  selectAllOrders,
  selectSelectedUserId,
  (orders: Order[], id) => (id == null ? [] : orders.filter((o: Order) => o.userId === id))
);

export const selectSelectedUserNameAndTotal = createSelector(
  selectSelectedUser,
  selectOrdersForSelectedUser,
  (user, orders: Order[]) => ({
    name: user?.name ?? '—',
    total: orders.reduce((sum: number, o: Order) => sum + o.total, 0),
  })
);
