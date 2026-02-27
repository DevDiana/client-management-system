import { inject, Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000/clients';

  getAll() {
    return this.http.get<Client[]>(this.api);
  }

  create(client: Client | Omit<Client, 'id'>) {
    return this.http.post<Client>(this.api, client);
  }

  update(id: number | string, client: Client) {
    return this.http.put<Client>(`${this.api}/${id}`, client);
  }

  delete(id: number | string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
