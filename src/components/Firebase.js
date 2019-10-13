import {firebaseConfig} from '../../config';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const Firebase = app.initializeApp(firebaseConfig);
export default Firebase;
