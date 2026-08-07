import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface PredictionRequest {
  Age: number;
  Gender: number;
  BMI: number;
  Smoking: number;
  AlcoholConsumption: number;
  PhysicalActivity: number;
  DietQuality: number;
  SleepQuality: number;
  FamilyHistoryKidneyDisease: number;
  FamilyHistoryHypertension: number;
  FamilyHistoryDiabetes: number;
  PreviousAcuteKidneyInjury: number;
  UrinaryTractInfections: number;
  SystolicBP: number;
  DiastolicBP: number;
  FastingBloodSugar: number;
  HbA1c: number;
  HeavyMetalsExposure: number;
  OccupationalExposureChemicals: number;
  WaterQuality: number;
  MedicalCheckupsFrequency: number;
  MedicationAdherence: number;
  HealthLiteracy: number;
}

export interface PredictionResponse {
  prediction: string;
  risk_percentage: number;
  recommendation: string;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = `${environment.apiUrl}/predict`;

  constructor(private http: HttpClient) {}

  predict(data: PredictionRequest): Observable<PredictionResponse> {
    return this.http.post<PredictionResponse>(this.apiUrl, data);
  }
}
