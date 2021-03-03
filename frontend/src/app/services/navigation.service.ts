import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NavigationService {
	private sideNavVisible: BehaviorSubject<boolean>;

	constructor() {
		this.sideNavVisible = new BehaviorSubject<boolean>(true);
	}

	getSidenavVisible(): Observable<boolean> {
		return this.sideNavVisible;
	}

	toggleSidenav(visibility?: boolean) {
		if (typeof visibility !== 'undefined') {
			this.sideNavVisible.next(visibility);
		} else {
			this.sideNavVisible.next(!this.sideNavVisible.value);
		}
	}
}
