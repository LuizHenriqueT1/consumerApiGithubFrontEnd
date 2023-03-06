import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { ConsumerRepository } from '../../models/consumer-repository';
import { ConsumerUser } from '../../models/consumer-user';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  consumerUrl = `${API_CONFIG.baseUrl.prod}/api`;
  apiUrl = `${API_CONFIG.baseUrl.mock}`;

  constructor(private http: HttpClient) {}

  // Service esta consumindo direto da api do github,
  // Para mudar para o deploy do back-end, basta trocar para ${this.consumerUrl}
  // Por motivos de ser mais rapido e assim fica viavel para o deploy do front-end no portifolio.

  getUserDetails(username: string): Observable<ConsumerUser> {
    // return this.http.get<ConsumerUser>(`${this.consumerUrl}/users/${username}/details`);
    return this.http.get<ConsumerUser>(`${this.apiUrl}/users/${username}`);
  }

  getUserRepositories(
    user: string,
    page: number,
    perPage: number
  ): Observable<ConsumerRepository[]> {
    return this.http.get<ConsumerRepository[]>(`${this.apiUrl}/users/${user}/repos?page=${page}&per_page=${perPage}`
    );
  }

  previousIds: number[] = [];
  getUsers(since: number, page: number): Observable<ConsumerUser[]> {
    return this.http.get<ConsumerUser[]>(`${this.apiUrl}/users?since=${since}&per_page=${page}`)
  }

  getNextPage(since: number, page: number): Observable<ConsumerUser[]> {
    return this.getUsers(since, page);
  }

  getPreviousPage(since: number, page: number): Observable<ConsumerUser[]> {
    return this.getUsers(since, page);
  }
}

