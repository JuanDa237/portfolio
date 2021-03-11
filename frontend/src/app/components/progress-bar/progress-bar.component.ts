import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
	@Input()
	public title: string;

	@Input()
	public color: string;

	@Input()
	public percent: number;

	constructor() {
		this.title = '';
		this.color = '';
		this.percent = 0;
	}
}
