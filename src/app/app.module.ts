import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { PacienteComponent } from './components/paciente/paciente.component';
import { BloqueoPipe } from './pipes/bloqueo.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RemoveAccentsPipe } from './pipes/acento.pipe';

import localeEsCL from '@angular/common/locales/es-CL';

import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPacienteApiComponent } from './components/info-paciente-api/info-paciente-api.component';

registerLocaleData(localeEsCL);

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    BloqueoPipe,
    RemoveAccentsPipe,
    InfoPacienteApiComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    HttpClientModule,
    {
      provide: LOCALE_ID, useValue: 'es-CL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
