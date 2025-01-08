import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chef {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChefService {
  private baseUrl = 'http://localhost:1337/api/chefs';

  constructor(private http: HttpClient) {}

  getChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(`${this.baseUrl}/chefs`);
  }
}
