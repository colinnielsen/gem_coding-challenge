import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import runServer from './server';

admin.initializeApp(functions.config().firebase);
export const db = admin.firestore();

export const api = functions.https.onRequest(runServer(db));
