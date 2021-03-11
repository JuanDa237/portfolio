import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-services-two',
	templateUrl: './services-two.component.html',
	styleUrls: ['./services-two.component.scss']
})
export class ServicesTwoComponent {
	@Input()
	icon: string;

	@Input()
	colorClass: string;

	@Input()
	title: string;

	constructor() {
		this.icon = '';
		this.colorClass = '';
		this.title = '';
	}
}
