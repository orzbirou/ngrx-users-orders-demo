import { Component } from '@angular/core';
import { UserOrdersComponent } from '../components/user-orders/user-orders/user-orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserOrdersComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}