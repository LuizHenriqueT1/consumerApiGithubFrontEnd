import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerUserRoutingModule } from './consumer-user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsumerRepositoryComponent } from './consumer-repository/consumer-repository/consumer-repository.component';
import { ConsumerUserComponent } from './consumer-user/consumer-user.component';

@NgModule({
  declarations: [ConsumerUserComponent, ConsumerRepositoryComponent],
  imports: [
    CommonModule,
    ConsumerUserRoutingModule,
    RouterModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ConsumerUserModule {}
