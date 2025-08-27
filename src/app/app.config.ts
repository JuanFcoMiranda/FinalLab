import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, provideNativeDateAdapter} from "@angular/material/core";
import {provideHttpClient, withFetch, withJsonpSupport} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch(), withJsonpSupport()),
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes, withComponentInputBinding()),
        provideNativeDateAdapter(),
        {
            provide: MAT_DATE_FORMATS,
            useValue: MAT_NATIVE_DATE_FORMATS
        }
    ]
};
