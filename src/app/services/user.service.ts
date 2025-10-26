import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, Order } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  // Load users and orders from mock JSON files
  getUsers(): Observable<{ users: User[]; orders: Order[] }> {
    return forkJoin({
      users: this.http.get<User[]>('assets/mocks/users.json'),
      orders: this.http.get<Order[]>('assets/mocks/orders.json')
    }).pipe(delay(400));
  }

  // Load user details from mock JSON files and filter
  getUserDetails(userId: number): Observable<{ user: User; orders: Order[] }> {
    return forkJoin({
      users: this.http.get<User[]>('assets/mocks/users.json'),
      orders: this.http.get<Order[]>('assets/mocks/orders.json')
    }).pipe(
      delay(800),
      map(({ users, orders }) => {
        const user = users.find(u => u.id === userId);
        if (!user) throw new Error('User not found');
        const userOrders = orders
          .filter(o => o.userId === userId)
          .map((o, idx) => ({ ...o, total: o.total + idx * 5 }));
        return { user, orders: userOrders };
      })
    );
  }
}
