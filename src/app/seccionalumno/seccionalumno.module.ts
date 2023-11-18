import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeccionalumnoPageRoutingModule } from './seccionalumno-routing.module';

import { SeccionalumnoPage } from './seccionalumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeccionalumnoPageRoutingModule
  ],
  declarations: [SeccionalumnoPage]
})
export class SeccionalumnoPageModule {}
