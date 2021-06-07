import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Express, Response } from 'express';

type firestoreDb = FirebaseFirestore.Firestore;
export const reject = (res: Response, error: Error): void => {
    res.status(400);
    res.send({ rejectMessage: error.message });
};

const getDocs = async (collectionName: string, db: firestoreDb) => (await db.collection(collectionName).get()).docs;

export const getQuestionById = async (db: firestoreDb, id: string): Promise<FirebaseFirestore.DocumentData> => {
    const question = await getDocs('questions', db).then(docs => docs.find(doc => doc.id === id));
    if (!question) throw new Error('question not found');
    return question;
};

export const getAnswers = async (db: firestoreDb): Promise<FirebaseFirestore.DocumentData> => {
    const answers = (await getDocs('answers', db)).map(doc => ({ id: doc.id, ...doc.data() }));
    if (!answers) throw new Error('answers not found');

    return answers;
};

export const initializeExpress = (): Express => {
    const app = express();

    app.use('/', express());
    app.use(bodyParser.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    return app;
};
