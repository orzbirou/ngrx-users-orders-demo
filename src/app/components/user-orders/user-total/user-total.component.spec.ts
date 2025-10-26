import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTotalComponent } from './user-total.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectSelectedUserNameAndTotal } from '../../../store/users/users.selectors';

describe('UserTotalComponent', () => {
  let component: UserTotalComponent;
  let fixture: ComponentFixture<UserTotalComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserTotalComponent,
        StoreModule.forRoot({})
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectSelectedUserNameAndTotal,
              value: { name: 'דוד כהן', total: 1500.75 }
            }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserTotalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the user total component', () => {
    expect(component).toBeTruthy();
  });

  it('should render total card', () => {
    const compiled = fixture.nativeElement;
    const totalCard = compiled.querySelector('.total-card');
    expect(totalCard).toBeTruthy();
  });

  it('should display formatted total amount', () => {
    const compiled = fixture.nativeElement;
    const totalAmount = compiled.querySelector('.total-amount');
    expect(totalAmount).toBeTruthy();
    expect(totalAmount.textContent).toContain('$1,500.75');
  });

  it('should display zero when no total is available', () => {
    store.overrideSelector(selectSelectedUserNameAndTotal, { name: '', total: 0 });
    store.refreshState();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const totalAmount = compiled.querySelector('.total-amount');
    expect(totalAmount.textContent).toContain('$0.00');
  });

  it('should render sparkline chart', () => {
    const compiled = fixture.nativeElement;
    const sparkline = compiled.querySelector('.sparkline');
    const sparklineBars = compiled.querySelectorAll('.sparkline-bar');
    
    expect(sparkline).toBeTruthy();
    expect(sparklineBars.length).toBe(7); // 7 bars in the sparkline
  });

  it('should display total label', () => {
    const compiled = fixture.nativeElement;
    const totalLabel = compiled.querySelector('.total-label');
    expect(totalLabel).toBeTruthy();
    expect(totalLabel.textContent.trim()).toBe('ערך התיק');
  });
});