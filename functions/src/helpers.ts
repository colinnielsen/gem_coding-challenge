import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Express, Response } from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
// import { Question } from './types';

type firestoreDb = FirebaseFirestore.Firestore;
export const reject = (res: Response, rejectMessage: string): void => {
    res.status(400).send(rejectMessage);
};

const getDocs = async (collectionName: string, db: firestoreDb) => (await db.collection(collectionName).get()).docs;

export const getQuestionById = async (db: firestoreDb, id: string): Promise<FirebaseFirestore.DocumentData> => {
    const question = await getDocs('questions', db).then(docs => docs.find(doc => doc.id === id));
    if (!question) throw new Error('question not found');
    return question;
};

export const getAnswerById = async (db: firestoreDb, id: string): Promise<FirebaseFirestore.DocumentData> => {
    const answer = await getDocs('answers', db).then(docs => docs.find(doc => doc.id === id));
    if (!answer) throw new Error('answer not found');
    return answer;
};

export const initializeApp = (): { db: firestoreDb; main: Express } => {
    const app = express();
    const main = express();

    main.use('/', app);
    main.use(bodyParser.json());
    main.use(bodyParser.urlencoded({ extended: false }));
    admin.initializeApp(functions.config().firebase);

    const db = admin.firestore();
    return { db, main };
};
