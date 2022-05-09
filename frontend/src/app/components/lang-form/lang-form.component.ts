import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-lang-form',
	templateUrl: './lang-form.component.html',
	styleUrls: ['./lang-form.component.scss']
})
export class LangFormComponent {
	public langs: string[];
	public selectedLang: string;

	constructor(private translateS: TranslateService) {
		this.langs = ['en', 'es'];
		this.selectedLang = '';

		this.translateS.addLangs(this.langs);
		this.translateS.setDefaultLang(this.langs[0]);

		let lang = localStorage.getItem('lang') || this.translateS.getBrowserLang();
		if (!lang) lang = this.langs[0];

		this.setLang(lang);
	}

	public onLangClick(lang: string): void {
		this.setLang(lang);
	}

	private setLang(lang: string) {
		const finalLang = this.getFinalLang(lang);

		localStorage.setItem('lang', finalLang);
		this.translateS.use(finalLang);
		this.selectedLang = finalLang;
	}

	private getFinalLang(lang: string): string {
		return this.langs.indexOf(lang) != -1 ? lang : 'en';
	}
}
