import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addDoc, collection, Firestore, getDocs, limit, orderBy, query } from '@angular/fire/firestore';
import { Logs } from '../../models/logs';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
	selector: 'poke-app-events',
	standalone: true,
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.css'],
	imports: [CommonModule, HeaderComponent],
})
export class EventsComponent {
	toto: Logs = { message: 'toto', id: Math.floor(Math.random() * 50).toString() };
	logs: Logs[] = [];

	constructor(private readonly firestore: Firestore) {
		this.getDocsFromLogsCollection();
	}

	addLog(logs: Logs) {
		addDoc(collection(this.firestore, 'logs'), logs);
	}

	async getDocsFromLogsCollection() {
		const q = query(collection(this.firestore, 'logs'), orderBy('id', 'desc'), limit(15));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			this.logs?.push({
				id: doc.data()['id'],
				message: doc.data()['message'],
			});
		});
	}
}
