import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User, Order } from '../../models/user.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    // page/app lifecycle
    'Enter Users Page': emptyProps(),

    // load all (users + orders)
    'Load Requested': emptyProps(),
    'Load Succeeded': props<{ users: User[]; orders: Order[] }>(),
    'Load Failed': props<{ error: unknown }>(),

    // CRUD (store-only)
    'Add User': props<{ user: User }>(),
    'Upsert User': props<{ user: User }>(), // prevents duplicates
    'Update User': props<{ update: Update<User> }>(),
    'Delete User': props<{ id: number }>(),
    'Save Users': props<{ users: User[] }>(),

    // selection
    'Select User': props<{ id: number | null }>(),

    // details flow
    'Selected User Details Requested': props<{ id: number }>(),
    'Selected User Details Succeeded': props<{ user: User; orders: Order[] }>(),
    'Selected User Details Failed': props<{ error: unknown }>(),
  },
});
