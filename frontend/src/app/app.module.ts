import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { containers } from './containers';
import { components } from './components';
import { sections } from './sections';
import { services } from './services';

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent, containers, components, sections],
	providers: [services],
	bootstrap: [AppComponent]
})
export class AppModule {}
