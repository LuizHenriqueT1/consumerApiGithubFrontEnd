import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerRepositoryComponent } from './consumer-repository/consumer-repository/consumer-repository.component';
import { ConsumerUserComponent } from './consumer-user/consumer-user.component';

const routes: Routes = [
  {
    path: 'users', component: ConsumerUserComponent
  },
  {
    path: 'users/:login/repos', component: ConsumerRepositoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerUserRoutingModule { }
