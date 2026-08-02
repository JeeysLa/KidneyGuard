import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the KidneyGuard AI overview', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('KidneyGuard AI');
    expect(compiled.textContent).toContain('AI health insights');
  });

  it('should calculate a screening risk percentage from the form inputs', () => {
    component.waterIntake = 1.2;
    component.exerciseFrequency = '0';
    component.hypertension = true;
    component.diabetes = true;

    component.calculateRisk();

    expect(component.riskPercentage).toBeGreaterThan(0);
    expect(component.showRiskResult).toBeTrue();
  });
});
