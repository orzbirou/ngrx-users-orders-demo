import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { UsersActions } from './users.actions';
import { UsersState } from '../app.state';
import { User } from '../../models/user.model';

export const usersAdapter = createEntityAdapter<User>({
  selectId: (u) => u.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState: UsersState = usersAdapter.getInitialState({
  selectedUserId: null,
});

const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,

    on(UsersActions.loadSucceeded, (state, { users }) =>
      usersAdapter.setAll(users, state)
    ),

    on(UsersActions.addUser, (state, { user }) =>
      usersAdapter.addOne(user, state)
    ),

    on(UsersActions.upsertUser, (state, { user }) =>
      usersAdapter.upsertOne(user, state) // add or update by id
    ),

    on(UsersActions.updateUser, (state, { update }) =>
      usersAdapter.updateOne(update, state)
    ),

    on(UsersActions.deleteUser, (state, { id }) =>
      usersAdapter.removeOne(id, state)
    ),

    on(UsersActions.saveUsers, (state, { users }) =>
      usersAdapter.setAll(users, state)
    ),

    on(UsersActions.selectUser, (state, { id }) => ({
      ...state,
      selectedUserId: id,
    }))
  ),
});

export const {
  name: usersFeatureKey,
  reducer: usersReducer,
  selectUsersState,
  selectSelectedUserId,
} = usersFeature;

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUsersTotal,
} = usersAdapter.getSelectors(selectUsersState);
