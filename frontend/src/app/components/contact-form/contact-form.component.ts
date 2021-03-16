import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from 'src/app/models';

@Component({
	selector: 'app-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
	public contactForm: FormGroup;

	@Input()
	public idForm: string;

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	constructor() {
		this.contactForm = new FormGroup({
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			]),
			email: new FormControl('', [Validators.required, Validators.email]),
			subject: new FormControl('', [
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(50)
			]),
			message: new FormControl('', [
				Validators.required,
				Validators.minLength(20),
				Validators.maxLength(280)
			])
		});
		this.idForm = '';

		this.onSubmitEvent = new EventEmitter<null>();
		this.invalidForm = new EventEmitter<boolean>();
	}

	ngOnInit(): void {
		this.contactForm.valueChanges.subscribe(() => {
			this.invalidForm.emit(this.contactForm.invalid);
		});
	}

	public submitEvent(): void {
		if (this.contactForm.valid) this.onSubmitEvent.emit(null);
	}

	public getEmailValues(): Email {
		return this.contactForm.value as Email;
	}

	public setEmailValues(email: Email): void {
		this.contactForm.patchValue({
			name: email.name,
			email: email.email,
			subject: email.subject,
			message: email.message
		});
	}

	// Form
	get name() {
		return this.contactForm.get('name');
	}

	get email() {
		return this.contactForm.get('email');
	}

	get subject() {
		return this.contactForm.get('subject');
	}

	get message() {
		return this.contactForm.get('message');
	}
}
