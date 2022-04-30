import {Component, EventEmitter, Output} from '@angular/core';

@Component({
	selector: 'app-nav-menu',
	templateUrl: './nav-menu.component.html',
	styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
	isExpanded = false;

	/** Событие для аутентификации */
	@Output()
	clickSignInEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

	/** Событие для получения пользователя */
	@Output()
	getCurentUser: EventEmitter<boolean> = new EventEmitter<boolean>();

	collapse() {
		this.isExpanded = false;
	}

	toggle() {
		this.isExpanded = !this.isExpanded;
	}

	clickSignIn() {
		this.clickSignInEvent.emit(true);
	}

	getUser() {
		this.getCurentUser.emit(true);
	}
}
