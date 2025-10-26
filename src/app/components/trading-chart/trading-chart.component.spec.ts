import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TradingChartComponent } from './trading-chart.component';

describe('TradingChartComponent', () => {
  let component: TradingChartComponent;
  let fixture: ComponentFixture<TradingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TradingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the trading chart component', () => {
    expect(component).toBeTruthy();
  });

  it('should render trading systems animation container', () => {
    const compiled = fixture.nativeElement;
    const animationContainer = compiled.querySelector('.trading-systems-animation');
    expect(animationContainer).toBeTruthy();
  });

  it('should render SVG trading chart', () => {
    const compiled = fixture.nativeElement;
    const tradingChart = compiled.querySelector('.trading-chart');
    const svgElement = compiled.querySelector('svg');
    
    expect(tradingChart).toBeTruthy();
    expect(svgElement).toBeTruthy();
  });

  it('should render grid lines in the chart', () => {
    const compiled = fixture.nativeElement;
    const gridLines = compiled.querySelector('.grid-lines');
    const lines = compiled.querySelectorAll('.grid-lines line');
    
    expect(gridLines).toBeTruthy();
    expect(lines.length).toBeGreaterThan(0);
  });

  it('should render data lines with animations', () => {
    const compiled = fixture.nativeElement;
    const dataLine1 = compiled.querySelector('.data-line-1');
    const dataLine2 = compiled.querySelector('.data-line-2');
    
    expect(dataLine1).toBeTruthy();
    expect(dataLine2).toBeTruthy();
  });

  it('should render arrow indicator', () => {
    const compiled = fixture.nativeElement;
    const arrow = compiled.querySelector('.arrow');
    
    expect(arrow).toBeTruthy();
  });
});