import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-section',
	templateUrl: './section.component.html',
	styleUrls: ['./section.component.scss']
})
export class SectionComponent {
	@Input()
	public heading: string;

	@Input()
	public title: string;

	@Input()
	public dataSection: string;

	constructor() {
		this.heading = '';
		this.title = '';
		this.dataSection = '';
	}
}
