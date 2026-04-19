import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, where, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);

// Error helper as per guidelines
export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo?: any;
}

export function handleFirestoreError(error: any, operationType: any, path: string | null = null): never {
  const errorInfo: FirestoreErrorInfo = {
    error: error.message,
    operationType,
    path,
    authInfo: auth.currentUser ? {
      userId: auth.currentUser.uid,
      email: auth.currentUser.email,
      emailVerified: auth.currentUser.emailVerified,
    } : 'guest'
  };
  throw new Error(JSON.stringify(errorInfo));
}

// Initial connection test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'system', 'health'));
  } catch (error: any) {
    if (error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
    // Silently fail if just missing doc, that's fine
  }
}
testConnection();

export const services = {
  async getMenuItems() {
    try {
      const q = query(collection(db, 'menuItems'), orderBy('name'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      handleFirestoreError(e, 'list', 'menuItems');
    }
  },
  async getCategories() {
    try {
      const q = query(collection(db, 'categories'), orderBy('order'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      handleFirestoreError(e, 'list', 'categories');
    }
  },
  async createReservation(data: any) {
    try {
      return await addDoc(collection(db, 'reservations'), {
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
    } catch (e) {
      handleFirestoreError(e, 'create', 'reservations');
    }
  },
  async createEventInquiry(data: any) {
    try {
      return await addDoc(collection(db, 'eventInquiries'), {
        ...data,
        createdAt: new Date().toISOString(),
      });
    } catch (e) {
      handleFirestoreError(e, 'create', 'eventInquiries');
    }
  }
};
