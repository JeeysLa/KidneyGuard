import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationDetailPage } from './education-detail.page';

describe('EducationDetailPage', () => {
  let component: EducationDetailPage;
  let fixture: ComponentFixture<EducationDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
