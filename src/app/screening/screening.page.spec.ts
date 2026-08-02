import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageService } from '../core/language.service';
import { ScreeningPage } from './screening.page';

describe('ScreeningPage', () => {
  let fixture: ComponentFixture<ScreeningPage>;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreeningPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreeningPage);
    languageService = TestBed.inject(LanguageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render localized question labels', () => {
    languageService.setLanguage('en');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain(languageService.t('screeningWater'));
    expect(text).toContain(languageService.t('screeningActivity'));
  });
});
