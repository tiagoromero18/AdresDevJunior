// En acquisition.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionService {
  private acquisitionCreatedSource = new Subject<any>();
  acquisitionCreated$ = this.acquisitionCreatedSource.asObservable();

  announceAcquisitionCreated(acquisition: any) {
    this.acquisitionCreatedSource.next(acquisition);
  }

  private apiUrl = 'http://localhost:5058/api/Acquisition'; // Ajusta según tu API

  constructor(private http: HttpClient) {}

  getAcquisitions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createAcquisition(acquisition: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, acquisition);
  }

  updateAcquisition(id: number, acquisition: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, acquisition);
  }

  deleteAcquisition(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  deactivateAcquisition(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/deactivate`, {});
  }

  activateAcquisition(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/activate`, {});
  }
}

