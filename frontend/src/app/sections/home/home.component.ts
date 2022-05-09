import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { interval, take } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	private translating: 'not-used' | 'running' | 'used';

	constructor(private translate: TranslateService) {
		this.translating = 'not-used';
	}

	ngOnInit(): void {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (this.translating == 'not-used') this.typeAnimation();
			else if (this.translating == 'used') this.translateAfterAnimation();
		});
	}

	private typeAnimation() {
		this.translating = 'running';

		let tag = document.getElementById('text');

		if (!tag) return;

		tag.innerHTML = '';
		let text = this.translate.instant('home.hello');
		let index = 0;
		const timer = interval(250).pipe(take(text.length));

		timer
			.subscribe((n) => {
				if (!tag) return;

				if (text.charAt(index) == '\n') {
					tag.innerHTML += '<br/>';
				} else {
					tag.innerHTML += text.charAt(index);
				}

				index++;
			})
			.add(() => {
				this.translating = 'used';

				window.requestAnimationFrame(() => {
					let tag2 = document.getElementById('subtitle');
					if (!tag2) return;

					tag2.className = 'fade-in';
				});
			});
	}

	private translateAfterAnimation() {
		let tag = document.getElementById('text');
		if (!tag) return;

		let text = this.translate.instant('home.hello');
		tag.innerText = '';

		for (let index = 0; index < text.length; index++) {
			if (text.charAt(index) == '\n') {
				tag.innerHTML += '<br/>';
			} else {
				tag.innerHTML += text.charAt(index);
			}
		}
	}
}
