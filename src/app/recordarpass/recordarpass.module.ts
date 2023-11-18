import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordarpassPageRoutingModule } from './recordarpass-routing.module';

import { RecordarpassPage } from './recordarpass.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RecordarpassPageRoutingModule
  ],
  declarations: [RecordarpassPage]
})
export class RecordarpassPageModule {}
