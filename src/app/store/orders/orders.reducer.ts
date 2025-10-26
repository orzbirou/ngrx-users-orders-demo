import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { UsersActions } from '../users/users.actions';
import { OrdersState } from '../app.state';
import { Order } from '../../models/user.model';

export const ordersAdapter = createEntityAdapter<Order>({
  selectId: (o) => o.id,
});

const initialOrders: OrdersState = ordersAdapter.getInitialState();

const ordersFeature = createFeature({
  name: 'orders',
  reducer: createReducer(
    initialOrders,
    on(UsersActions.loadSucceeded, (state, { orders }) =>
      ordersAdapter.setAll(orders, state)
    ),

    // When details arrive for the selected user, replace that user's orders
    on(UsersActions.selectedUserDetailsSucceeded, (state, { orders }) => {
      const selectedUserId = orders[0]?.userId;
      if (selectedUserId == null) return state;
      const sel = ordersAdapter.getSelectors();
      const current = sel.selectAll({ ...state });
      const toRemove = current.filter(o => o.userId === selectedUserId).map(o => o.id);
      const cleaned = ordersAdapter.removeMany(toRemove, state);
      return ordersAdapter.addMany(orders, cleaned);
    })
  ),
});

export const {
  name: ordersFeatureKey,
  reducer: ordersReducer,
  selectOrdersState,
} = ordersFeature;

export const {
  selectEntities: selectOrderEntities,
  selectAll: selectAllOrders,
} = ordersAdapter.getSelectors(selectOrdersState);
