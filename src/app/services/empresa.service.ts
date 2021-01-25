import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { BaseDto } from '../models/dto/base-dto';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    public http: HttpClient,
    public storage: StorageService
  ) { }

  findByIdDto(id: string): Observable<BaseDto> {
    return this.http.get<BaseDto>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }
}
