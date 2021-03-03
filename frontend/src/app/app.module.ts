import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { containers } from './containers';
import { services } from './services';

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent, containers],
	providers: [services],
	bootstrap: [AppComponent]
})
export class AppModule {}
