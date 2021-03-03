import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent {
	constructor(private navigationService: NavigationService) {}

	public toggleSideNav(): void {
		this.navigationService.toggleSidenav();
	}
}
