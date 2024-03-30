import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { I18nModule } from '@app/i18n';

import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, I18nModule],
})
export class RegisterModule {}
