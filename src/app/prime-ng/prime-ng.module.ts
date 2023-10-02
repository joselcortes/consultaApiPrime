import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';



@NgModule({
  exports: [
    BrowserAnimationsModule,
    InputTextModule,
    DividerModule,
    ProgressSpinnerModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule
  ],
})
export class PrimeNgModule { }
