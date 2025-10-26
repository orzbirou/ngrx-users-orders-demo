import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserNameComponent } from './user-name.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectSelectedUserNameAndTotal } from '../../../store/users/users.selectors';

describe('UserNameComponent', () => {
  let component: UserNameComponent;
  let fixture: ComponentFixture<UserNameComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserNameComponent,
        StoreModule.forRoot({})
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectSelectedUserNameAndTotal,
              value: { name: 'דוד כהן', total: 300 }
            }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserNameComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the user name component', () => {
    expect(component).toBeTruthy();
  });

  it('should render user info card', () => {
    const compiled = fixture.nativeElement;
    const userInfoCard = compiled.querySelector('.user-info-card');
    expect(userInfoCard).toBeTruthy();
  });

  it('should display selected user name', () => {
    const compiled = fixture.nativeElement;
    const userName = compiled.querySelector('.user-name');
    expect(userName).toBeTruthy();
    expect(userName.textContent.trim()).toBe('דוד כהן');
  });

  it('should display default text when no user is selected', () => {
    store.overrideSelector(selectSelectedUserNameAndTotal, { name: '', total: 0 });
    store.refreshState();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const userName = compiled.querySelector('.user-name');
    expect(userName.textContent.trim()).toBe('לא נבחר לקוח');
  });

  it('should render user title label', () => {
    const compiled = fixture.nativeElement;
    const userTitle = compiled.querySelector('.user-title');
    expect(userTitle).toBeTruthy();
    expect(userTitle.textContent.trim()).toBe('לקוח נבחר');
  });
});