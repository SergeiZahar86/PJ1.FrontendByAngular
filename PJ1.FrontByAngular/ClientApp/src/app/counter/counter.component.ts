import {AfterContentInit, Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-counter-component',
	templateUrl: './counter.component.html',
	styleUrls: ['./counter.scss']
})
export class CounterComponent implements OnInit, AfterContentInit {

	public currentCount = 0;

	public claims: any;

	constructor() {
	}

	async ngAfterContentInit(): Promise<void> {
	}

	/**
	 * Увеличивает счетчик
	 */
	public incrementCounter() {
		this.currentCount++;
	}


	ngOnInit(): void {
	}

}
