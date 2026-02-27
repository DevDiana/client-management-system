import { Routes } from '@angular/router';
import { ClientListComponent } from './features/clients/client-list/client-list.component';
import { ClientFormComponent } from './features/clients/client-form/client-form.component';

export const routes: Routes = [
  { path: '', component: ClientListComponent },
  { path: 'novo', component: ClientFormComponent },
];
