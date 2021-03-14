import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-education',
	templateUrl: './education.component.html',
	styleUrls: ['./education.component.scss']
})
export class EducationComponent {
	constructor(private translateService: TranslateService) {
		this.translateService.addLangs(['en', 'es']);
		this.translateService.setDefaultLang('en');

		const browserLang = this.translateService.getBrowserLang();
		this.translateService.use(browserLang.match(/en|es/) ? browserLang : 'en');
	}
}
