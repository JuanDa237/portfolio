import { Component, OnInit } from '@angular/core';
import { interval, take } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {
		this.typeAnimation();
	}

	private typeAnimation() {
		let tag = document.getElementById('text');

		if (!tag) return;

		tag.innerHTML = '';
		let text = "Hello\nI'm\nJuan";
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
				window.requestAnimationFrame(() => {
					let tag2 = document.getElementById('subtitle');
					if (!tag2) return;

					tag2.className = 'fade-in';
				});
			});
	}
}
