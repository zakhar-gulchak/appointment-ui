import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCZVP1gtIT5h9iwBD56hgH663vNWHGa7x8',
  authDomain: 'appointment-service-5c0e0.firebaseapp.com',
  projectId: 'appointment-service-5c0e0',
  storageBucket: 'appointment-service-5c0e0.appspot.com',
  messagingSenderId: '709123247010',
  appId: '1:709123247010:web:027ce9c4cc6c9b658140fb',
  measurementId: 'G-MBVFH0YX6Y',
}
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
