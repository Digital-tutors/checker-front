import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';

import { ApiModule } from '@swagger/api.module';
import { Configuration } from '@swagger/configuration';

import { AppState } from '@store/app.state';

import { environment } from '@environments/environment';

import { AuthInterceptor } from '@share/interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MonacoEditorModule } from 'ngx-monaco-editor';

export function GetApiConfiguration() {
  return new Configuration({
    apiKeys: {},
    basePath: environment.apiUrl,
  });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production,
    }),
    ApiModule.forRoot(GetApiConfiguration),
    BrowserAnimationsModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
