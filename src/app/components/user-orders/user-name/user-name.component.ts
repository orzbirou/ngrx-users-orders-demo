import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectSelectedUserNameAndTotal } from '../../../store/users/users.selectors';

@Component({
  selector: 'app-user-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent {
  private store = inject(Store);
  vm$ = this.store.select(selectSelectedUserNameAndTotal);
  
  getInitials(name: string | undefined): string {
    if (!name) return '?';
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2);
  }
}
