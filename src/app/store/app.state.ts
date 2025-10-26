import { EntityState } from '@ngrx/entity';
import { User, Order } from '../models/user.model';

export interface UsersState extends EntityState<User> {
  selectedUserId: number | null;
}

export interface OrdersState extends EntityState<Order> {}

export interface AppState {
  users: UsersState;
  orders: OrdersState;
}
