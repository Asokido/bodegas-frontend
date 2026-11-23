import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';

// Para mostrar los precios como 2.500.000
registerLocaleData(localeEsCl);

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'es-CL' }],
};
