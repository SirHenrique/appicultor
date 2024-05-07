import {db} from '../utils/firebase';
import {setDoc, doc, deleteDoc, updateDoc, getDocs, collection, query,
  getDoc, where} from 'firebase/firestore'

export class UserCollection {
 private userCollection = collection(db,'user');
 
}