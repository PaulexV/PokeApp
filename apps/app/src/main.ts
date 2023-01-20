import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environements/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from "@angular/fire/storage"

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
		provideHttpClient(),
		importProvidersFrom(
			BrowserAnimationsModule,
			HttpClientModule,
			ServiceWorkerModule.register('ngsw-worker.js', {
				enabled: !isDevMode(),
				// Register the ServiceWorker as soon as the application is stable
				// or after 30 seconds (whichever comes first).
				registrationStrategy: 'registerWhenStable:30000',
			}),
			provideFirebaseApp(() => initializeApp(environment.firebase)),
			provideAuth(() => getAuth()),
			provideFirestore(() => getFirestore()),
			provideStorage(() => getStorage())
		),
	],
}).catch((err) => console.error(err));
