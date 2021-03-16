import { Component, ViewChild } from '@angular/core';

import { ContactMeService } from 'src/app/services/contact-me.service';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';

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

	constructor(private contactMeService: ContactMeService) {
		this.invalidForm = true;

		this.sentEmail = false;
		this.loading = false;
		this.error = false;
	}

	public sendEmail(): void {
		var email = this.contactMeForm?.getEmailValues();

		if (email) {
			this.loading = true;

			this.contactMeService.sendEmail(email).subscribe(
				(resolve) => {
					this.sentEmail = true;
					this.loading = false;
					this.error = false;
				},
				(error) => {
					this.sentEmail = true;
					this.loading = false;
					this.error = true;

					throw new Error(error);
				}
			);
		}
	}
}
