import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [CommonModule, TranslateModule, IonicModule, AuthModule, RouterModule],
  declarations: [ShellComponent],
})
export class ShellModule {}
