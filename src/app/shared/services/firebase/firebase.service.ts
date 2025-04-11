import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {collection, getDocs} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(private firestore: AngularFirestore) {
  }

  // Function to add a document to a collection
  addDocument(collectionName: string, data: any): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(collectionName).doc(id).set(data);
  }

  // Function to get all documents from a collection
  async getDocuments(collectionName: string): Promise<any[]> {
    const snapshot = await this.firestore.collection(collectionName).get().toPromise();
    const documents: any[] = [];

    snapshot?.forEach(doc => {
      const data = doc.data();
      if (data) {
        documents.push({ id: doc.id, ...data });
      }
    });

    return documents;
  }

  // Function to update a document in a collection
  updateDocument(collectionName: string, id: string, data: any): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).update(data);
  }


  // Function to delete a document from a collection
  deleteDocument(collectionName: string, id: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).delete();
  }

  // Function to get a specific document by ID
  async getDocumentById(collectionName: string, id: string): Promise<any> {
    const docSnap = await this.firestore.collection(collectionName).doc(id).get().toPromise();

    if (!docSnap || !docSnap.exists) {
      return null; // or throw an error, depending on your logic
    }

    const data:any = docSnap.data();
    return { id: docSnap.id, ...data };
  }

  // add new document to a collection
  async addNewDocument(collectionName: string, data: any): Promise<void> {
    const docRef = this.firestore.collection(collectionName).doc();
    await docRef.set(data);
  }
}
