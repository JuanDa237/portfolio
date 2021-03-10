import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-services-one',
	templateUrl: './services-one.component.html',
	styleUrls: ['./services-one.component.scss']
})
export class ServicesOneComponent {
	@Input()
	iconClass: string;

	@Input()
	colorClass: string;

	@Input()
	title: string;

	constructor() {
		this.iconClass = '';
		this.colorClass = '';
		this.title = '';
	}
}
