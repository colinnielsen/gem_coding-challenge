import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

main.use('/', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const db = admin.firestore();

export const api = functions.https.onRequest(main);
