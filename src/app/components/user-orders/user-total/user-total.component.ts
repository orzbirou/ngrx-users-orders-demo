import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectSelectedUserNameAndTotal } from '../../../store/users/users.selectors';

@Component({
  selector: 'app-user-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-total.component.html',
  styleUrls: ['./user-total.component.scss']
})
export class UserTotalComponent {
  private store = inject(Store);
  vm$ = this.store.select(selectSelectedUserNameAndTotal);
}
