import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { interval, take } from 'rxjs';

@Component({
	selector: 'app-preloader',
	templateUrl: './preloader.component.html',
	styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
	@Output()
	private preloading: EventEmitter<boolean>;

	constructor() {
		this.preloading = new EventEmitter<boolean>();
	}

	ngOnInit(): void {
		this.preloading.emit(true);
		this.deletePreloader();
	}

	deletePreloader(): void {
		const timer = interval(1800).pipe(take(1));

		timer.subscribe(() => {
			window.requestAnimationFrame(() => {
				let loader = document.getElementById('loader');
				if (!loader) return;

				loader.className = 'fade-out';
			});

			const timer2 = interval(720).pipe(take(1));

			timer2.subscribe(() => {
				this.preloading.emit(false);
			});
		});
	}
}
