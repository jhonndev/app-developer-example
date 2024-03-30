import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface NumbersCollections {
  notMultiples: number[];
  multipleTree: number[];
  multipleFive: number[];
  multipleSeven: number[];
  numberEntered: number;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private firestore: AngularFirestore) {}

  saveDataCollections(numbersData: NumbersCollections) {
    /*this.firestore.collection('multiples').add(numbersData)
      .then(() => {
        console.log('Data saved successfully');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });*/

    const docRef = this.firestore.collection('multiples').doc('multiple');

    // Escribe o actualiza el objeto data en el documento
    docRef
      .set(numbersData)
      .then(() => {
        console.log('Data saved successfully');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  }
}
