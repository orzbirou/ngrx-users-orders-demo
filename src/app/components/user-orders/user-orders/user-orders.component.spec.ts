import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserOrdersComponent } from './user-orders.component';
import { UserNameComponent } from '../user-name/user-name.component';
import { UserTotalComponent } from '../user-total/user-total.component';
import { TradingChartComponent } from '../../trading-chart/trading-chart.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UsersActions } from '../../../store/users/users.actions';

describe('UserOrdersComponent', () => {
  let component: UserOrdersComponent;
  let fixture: ComponentFixture<UserOrdersComponent>;
  let store: MockStore;

  const mockUsers = [
    { id: 1, name: 'דוד כהן' },
    { id: 2, name: 'שרה לוי' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserOrdersComponent,
        UserNameComponent,
        UserTotalComponent,
        TradingChartComponent,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        provideMockStore({
          initialState: {
            users: {
              entities: {},
              ids: [],
              selectedUserId: null
            }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserOrdersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the user orders component', () => {
    expect(component).toBeTruthy();
  });

  it('should render dashboard container', () => {
    const compiled = fixture.nativeElement;
    const dashboardContainer = compiled.querySelector('.dashboard-container');
    expect(dashboardContainer).toBeTruthy();
  });

  it('should dispatch loadRequested action on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.loadRequested());
  });

  it('should dispatch selectUser action when select is called', () => {
    spyOn(store, 'dispatch');
    const userId = 1;
    
    component.select(userId);
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.selectUser({ id: userId }));
  });

  it('should dispatch selectUser with null when clear is called', () => {
    spyOn(store, 'dispatch');
    
    component.clear();
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.selectUser({ id: null }));
  });

  it('should render clear button', () => {
    const compiled = fixture.nativeElement;
    const clearButton = compiled.querySelector('.clear-btn');
    expect(clearButton).toBeTruthy();
  });
});