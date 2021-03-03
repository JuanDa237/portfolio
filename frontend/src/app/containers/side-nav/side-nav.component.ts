import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
	constructor(private navigationService: NavigationService) {}

	public toggleSideNav(): void {
		this.navigationService.toggleSidenav();
	}
}
