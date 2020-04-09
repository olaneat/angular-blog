import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { CoreModule } from './core/core.module';
import {JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ArticleModule,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter(){
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['https://eblog-api.encentrals.com/api'],
        blacklistedRoutes: [],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
