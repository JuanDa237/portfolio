import { Component, ViewChild } from '@angular/core';

import { ContactMeService } from 'src/app/services/contact-me.service';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
	public invalidForm: boolean;

	public sentEmail: boolean;
	public loading: boolean;
	public error: boolean;

	@ViewChild(ContactFormComponent)
	private contactMeForm?: ContactFormComponent;

	constructor(
		private contactMeService: ContactMeService,
		private translateService: TranslateService
	) {
		this.invalidForm = true;

		this.sentEmail = false;
		this.loading = false;
		this.error = false;

		// Translator
		this.translateService.addLangs(['en', 'es']);
		this.translateService.setDefaultLang('en');

		const browserLang = this.translateService.getBrowserLang();
		this.translateService.use(browserLang.match(/en|es/) ? browserLang : 'en');
	}

	public sendEmail(): void {
		var email = this.contactMeForm?.getEmailValues();

		if (email) {
			this.loading = true;

			this.contactMeService.sendEmail(email).subscribe(
				(resolve) => {
					this.loading = false;
					this.sentEmail = true;
					this.error = false;
				},
				(error) => {
					this.sentEmail = false;
					this.loading = false;
					this.error = true;

					if (email) this.contactMeForm?.setEmailValues(email);
					throw new Error(error);
				}
			);
		}
	}
}
