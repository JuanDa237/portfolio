import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { containers } from './containers';

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent, containers],
	bootstrap: [AppComponent]
})
export class AppModule {}
