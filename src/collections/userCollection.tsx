import { Usuario } from '@/@types/usuario';
import {db} from '../utils/firebase';
import {setDoc, doc, deleteDoc, updateDoc, getDocs, collection, query,
  getDoc, where} from 'firebase/firestore'

export class UserCollection {
 private userCollection = collection(db,'usuarios');
 
public async getUser(userId: string): Promise<any> {
  try {
    const docRef = doc(this.userCollection, userId)

    const docSnapShot = await getDoc(docRef)
    
    if(docSnapShot.exists()) {
      return docSnapShot.data()
    }
    
  } catch(error) {
    console.log(error)
  }
 }
}