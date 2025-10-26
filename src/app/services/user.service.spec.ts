import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User, Order } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    { id: 1, name: 'דוד כהן' },
    { id: 2, name: 'שרה לוי' }
  ];

  const mockOrders: Order[] = [
    { id: 1, userId: 1, total: 150.50 },
    { id: 2, userId: 1, total: 250.75 },
    { id: 3, userId: 2, total: 300.25 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load users and orders successfully', () => {
    service.getUsers().subscribe(result => {
      expect(result.users).toEqual(mockUsers);
      expect(result.orders).toEqual(mockOrders);
    });

    const usersReq = httpMock.expectOne('assets/mocks/users.json');
    const ordersReq = httpMock.expectOne('assets/mocks/orders.json');
    
    expect(usersReq.request.method).toBe('GET');
    expect(ordersReq.request.method).toBe('GET');
    
    usersReq.flush(mockUsers);
    ordersReq.flush(mockOrders);
  });

  it('should load user details with modified order totals', fakeAsync(() => {
    const userId = 1;
    let result: any;
    
    service.getUserDetails(userId).subscribe(data => {
      result = data;
    });

    const usersReq = httpMock.expectOne('assets/mocks/users.json');
    const ordersReq = httpMock.expectOne('assets/mocks/orders.json');
    
    usersReq.flush(mockUsers);
    ordersReq.flush(mockOrders);
    
    tick(800); // Account for delay
    
    expect(result.user).toEqual(mockUsers[0]);
    expect(result.orders.length).toBe(2);
    
    // Check that order totals are modified (original + idx * 5)
    expect(result.orders[0].total).toBe(150.50); // first order: original + 0 * 5
    expect(result.orders[1].total).toBe(255.75); // second order: original + 1 * 5
  }));

  it('should throw error when user not found', fakeAsync(() => {
    const nonExistentUserId = 999;
    let error: any;
    
    service.getUserDetails(nonExistentUserId).subscribe({
      next: () => fail('Expected error'),
      error: (err) => {
        error = err;
      }
    });

    const usersReq = httpMock.expectOne('assets/mocks/users.json');
    const ordersReq = httpMock.expectOne('assets/mocks/orders.json');
    
    usersReq.flush(mockUsers);
    ordersReq.flush(mockOrders);
    
    tick(800); // Account for delay
    
    expect(error.message).toBe('User not found');
  }));

  it('should filter orders by user ID', fakeAsync(() => {
    const userId = 2;
    let result: any;
    
    service.getUserDetails(userId).subscribe(data => {
      result = data;
    });

    const usersReq = httpMock.expectOne('assets/mocks/users.json');
    const ordersReq = httpMock.expectOne('assets/mocks/orders.json');
    
    usersReq.flush(mockUsers);
    ordersReq.flush(mockOrders);
    
    tick(800); // Account for delay
    
    expect(result.orders.length).toBe(1);
    expect(result.orders[0].userId).toBe(userId);
    expect(result.orders[0].total).toBe(300.25);
  }));
});