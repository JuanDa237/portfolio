import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { containers } from './containers';
import { components } from './components';
import { sections } from './sections';
import { services } from './services';

@NgModule({
	imports: [BrowserModule, ReactiveFormsModule],
	declarations: [AppComponent, containers, components, sections],
	providers: [services],
	bootstrap: [AppComponent]
})
export class AppModule {}
