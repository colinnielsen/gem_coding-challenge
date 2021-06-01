import * as request from 'supertest';
import makeApp, { FirestoreDb } from '../server';

import fakeFirebase from './fakeFirebase';

describe('/questions', () => {
    const server = makeApp(fakeFirebase as unknown as FirestoreDb);

    it('queries for all questions', async () => {
        const response = await request(server).get('/questions');

        expect(Array.isArray(response.body));
        expect(response.statusCode).toBe(200);
    });

    it('queries for a single question', async () => {
        const response = await request(server).get('/question/6uUwiBKtprG2LOfi8F5g');

        expect(response.body.question).toEqual('How much wood could a wood chuck chuck?');
        expect(response.statusCode).toBe(200);
    });

    it('validates an answer', async () => {
        const falseValidation = await request(server).post('/validate/6uUwiBKtprG2LOfi8F5g').send({
            answer: 'B',
        });

        expect(falseValidation.body.isValid).toEqual(false);
        expect(falseValidation.statusCode).toBe(200);

        const trueValidation = await request(server).post('/validate/PhionxNwDCwTd1fMe5by').send({
            answer: 'C',
        });
        expect(trueValidation.body.isValid).toEqual(true);
        expect(trueValidation.statusCode).toBe(200);
    });
});
