import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Logs } from '../../models/logs';

@Injectable({
	providedIn: 'root',
})
export class LogService {
	constructor(private readonly firestore: Firestore) {}

	addLog(logs: Logs) {
		addDoc(collection(this.firestore, 'logs'), logs);
	}
}
