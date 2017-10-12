import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';


export const AppRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'CX Programming Language' }
  },

]
