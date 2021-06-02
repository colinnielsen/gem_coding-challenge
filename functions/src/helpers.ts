import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Express, Response } from 'express';

type firestoreDb = FirebaseFirestore.Firestore;
export const reject = (res: Response, rejectMessage: string): void => {
    res.status(400).send({ rejectMessage });
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

export const initializeExpress = (): Express => {
    const app = express();

    app.use('/', express());
    app.use(bodyParser.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    return app;
};
