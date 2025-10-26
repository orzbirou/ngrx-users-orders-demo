import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserOrdersComponent } from '../components/user-orders/user-orders/user-orders.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        UserOrdersComponent,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main header', () => {
    const compiled = fixture.nativeElement;
    const header = compiled.querySelector('.header');
    expect(header).toBeTruthy();
  });

  it('should have mobile menu functionality', () => {
    expect(component.isMobileMenuOpen).toBe(false);
    
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen).toBe(true);
    
    component.closeMobileMenu();
    expect(component.isMobileMenuOpen).toBe(false);
  });

  it('should render desktop navigation links', () => {
    const compiled = fixture.nativeElement;
    const navLinks = compiled.querySelectorAll('.desktop-nav .nav-link');
    expect(navLinks.length).toBeGreaterThan(0);
    expect(navLinks[0].textContent.trim()).toBe('לוח בקרה');
  });

  it('should render page title and subtitle', () => {
    const compiled = fixture.nativeElement;
    const pageTitle = compiled.querySelector('.page-title');
    const pageSubtitle = compiled.querySelector('.page-subtitle');
    
    expect(pageTitle).toBeTruthy();
    expect(pageSubtitle).toBeTruthy();
    expect(pageTitle.textContent).toContain('ניהול תיק השקעות לקוחות');
  });
});