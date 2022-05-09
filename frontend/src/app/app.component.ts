import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public preloading;

	constructor() {
		this.preloading = true;
	}

	// Events

	public preloadingEvent(event: boolean): void {
		this.preloading = event;
	}
}
