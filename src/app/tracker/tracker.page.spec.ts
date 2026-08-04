import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackerPage } from './tracker.page';

describe('TrackerPage', () => {
  let component: TrackerPage;
  let fixture: ComponentFixture<TrackerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the displayed water value when Add Water is clicked', () => {
    const buttons = fixture.nativeElement.querySelectorAll('ion-button');
    buttons[0].click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('1750 ml');
  });
});
