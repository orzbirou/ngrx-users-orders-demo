import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersReducer, usersFeatureKey } from './store/users/users.reducer';
import { ordersReducer, ordersFeatureKey } from './store/orders/orders.reducer';
import { UsersEffects } from './store/users/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({
      [usersFeatureKey]: usersReducer,
      [ordersFeatureKey]: ordersReducer,
    }),
    provideEffects([UsersEffects]),
    // Enable Store DevTools so the Redux DevTools browser extension can detect the store
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: false,
      connectInZone: true 
    }),
  ],
};
