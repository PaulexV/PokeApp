import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { collection, Firestore, getDocs, limit, orderBy, query } from '@angular/fire/firestore';
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
	logs: Logs[] = [];

	constructor(private readonly firestore: Firestore) {
		this.getDocsFromLogsCollection();
	}

	async getDocsFromLogsCollection() {
		const q = query(collection(this.firestore, 'logs'), orderBy('timestamp', 'desc'), limit(15));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			this.logs?.push({
				timestamp: doc.data()['timestamp'],
				message: doc.data()['message'],
				profilePic: doc.data()['profilePic'],
			});
		});
	}
}
