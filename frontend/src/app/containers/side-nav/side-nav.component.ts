import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
	constructor(
		private navigationService: NavigationService,
		private translateService: TranslateService
	) {
		this.translateService.addLangs(['en', 'es']);
		this.translateService.setDefaultLang('en');

		const browserLang = this.translateService.getBrowserLang();
		this.translateService.use(browserLang.match(/en|es/) ? browserLang : 'en');
	}

	public toggleSideNav(): void {
		this.navigationService.toggleSidenav();
	}
}
