import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreeningPage } from './screening.page';

describe('ScreeningPage', () => {
  let component: ScreeningPage;
  let fixture: ComponentFixture<ScreeningPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require a valid age before predicting risk', () => {
    component.age = null;
    component.predictRisk();

    expect(component.validationMessage).toContain('Age');
    expect(component.risk).toBe(18);
  });

  it('should mark the result as medium risk when risk factors are present', () => {
    component.diabetes = true;
    component.hypertension = true;
    component.familyHistory = true;
    component.smoking = true;
    component.waterIntake = 1200;

    component.predictRisk();

    expect(component.riskStatus).toBe('Medium Risk');
    expect(component.risk).toBe(90);
  });
});
