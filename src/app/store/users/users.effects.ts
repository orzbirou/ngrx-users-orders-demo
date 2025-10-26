import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { UserService } from '../../services/user.service';
import { catchError, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { selectSelectedUserId } from './users.selectors';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private api: UserService, private store: Store) {}


  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadRequested),
      switchMap(() =>
        this.api.getUsers().pipe(
          map(({ users, orders }) => UsersActions.loadSucceeded({ users, orders })),
          catchError((error) => of(UsersActions.loadFailed({ error })))
        )
      )
    )
  );

  // When selectedUserId changes => call API (cancel previous in-flight via switchMap)
  selectedDetails$ = createEffect(() =>
    this.store.select(selectSelectedUserId).pipe(
      distinctUntilChanged(),
      filter((id): id is number => id != null),
      switchMap((id) =>
        this.api.getUserDetails(id).pipe(
          map(({ user, orders }) => UsersActions.selectedUserDetailsSucceeded({ user, orders })),
          catchError((error) => of(UsersActions.selectedUserDetailsFailed({ error })))
        )
      )
    )
  );
}
