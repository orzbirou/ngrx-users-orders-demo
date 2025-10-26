import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectSelectedUserNameAndTotal } from '../../../store/users/users.selectors';
import { UsersActions } from '../../../store/users/users.actions';
import { selectAllUsers } from '../../../store/users/users.reducer';
import { UserNameComponent } from '../user-name/user-name.component';
import { UserTotalComponent } from '../user-total/user-total.component';
import { TradingChartComponent } from '../../trading-chart/trading-chart.component';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, UserNameComponent, UserTotalComponent, TradingChartComponent],
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {
  private store = inject(Store);
  users$ = this.store.select(selectAllUsers);
  summary$ = this.store.select(selectSelectedUserNameAndTotal);

  ngOnInit() {
  this.store.dispatch(UsersActions.loadRequested());
 }

  select(id: number) {
    this.store.dispatch(UsersActions.selectUser({ id }));
  }
  
  clear() {
    this.store.dispatch(UsersActions.selectUser({ id: null }));
  }
}
