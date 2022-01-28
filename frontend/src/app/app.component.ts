import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from './services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
	@HostBinding('class.sidenav-toggled')
	public sidenavHidden = false;

	private subscription: Subscription = new Subscription();

	constructor(private navigationService: NavigationService) {}

	ngOnInit() {
		this.subscription.add(
			this.navigationService.getSidenavVisible().subscribe((isVisible) => {
				this.sidenavHidden = !isVisible;
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
