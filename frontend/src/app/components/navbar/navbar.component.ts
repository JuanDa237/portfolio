import { Component, OnInit } from '@angular/core';
import { interval, take } from 'rxjs';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	public glassbg: boolean;

	constructor() {
		this.glassbg = false;
	}

	ngOnInit() {
		this.navbarColorChange();
	}

	private navbarColorChange(): void {
		let navbar = document.getElementById('main-nav');
		let sc = document.getElementById('scroll-container');

		sc?.addEventListener('scroll', () => {
			if (!navbar) return;
			if (!sc?.scrollTop) return;

			let wh = window.innerHeight;
			let section = Math.floor(sc?.scrollTop / wh);

			if (section % 2 == 0) {
				navbar.classList.add('navbar-one');
				navbar.classList.remove('navbar-two');
			} else {
				navbar.classList.remove('navbar-one');
				navbar.classList.add('navbar-two');
			}
		});
	}

	// Events
	public toggleGlassbg() {
		if (this.glassbg) {
			const timer = interval(350).pipe(take(1));

			timer.subscribe(() => {
				this.glassbg = !this.glassbg;
			});
		} else {
			this.glassbg = !this.glassbg;
		}
	}
}
