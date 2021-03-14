import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
	constructor(private translateService: TranslateService) {
		this.translateService.addLangs(['en', 'es']);
		this.translateService.setDefaultLang('en');

		const browserLang = this.translateService.getBrowserLang();
		this.translateService.use(browserLang.match(/en|es/) ? browserLang : 'en');
	}
}
