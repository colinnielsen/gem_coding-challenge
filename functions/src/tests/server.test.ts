import * as request from 'supertest';
import makeApp, { FirestoreDb } from '../server';
import { DBQuestion } from '../types';
import fakeFirebase from './fakeFirebase';

describe('/questions', () => {
    const ids = ['6uUwiBKtprG2LOfi8F5g', 'PhionxNwDCwTd1fMe5by'];
    const server = makeApp(fakeFirebase as unknown as FirestoreDb);

    it('queries for all questions', async () => {
        const response = await request(server).get('/questions');

        expect(Array.isArray(response.body));
        expect(response.statusCode).toBe(200);

        response.body.forEach((question: DBQuestion) => {
            expect(question).toHaveProperty('id');
            expect(question).toHaveProperty('question');
            expect(question).toHaveProperty('choices');

            expect(question.choices.length).toEqual(3);

            question.choices.forEach(choice => {
                expect(choice).toMatchObject(
                    expect.objectContaining({
                        label: expect.any(String),
                        value: expect.any(String),
                    }),
                );
            });
        });
    });

    it('queries for a single question', async () => {
        const response = await request(server).get(`/question/${ids[0]}`);

        expect(response.body.question).toEqual('How much wood could a wood chuck chuck?');
        expect(response.statusCode).toBe(200);

        const failedResponse = await request(server).get(`/question/all`);

        expect(failedResponse.body.rejectMessage).toEqual('question not found');
        expect(failedResponse.statusCode).toBe(400);
    });

    it('validates an answer', async () => {
        const falseValidation = await request(server)
            .post('/validate')
            .send({
                answers: [{ id: ids[0], answer: 'B' }],
            });

        expect(falseValidation.body.validation[ids[0]]).toEqual(false);
        expect(falseValidation.statusCode).toBe(200);

        const trueValidation = await request(server)
            .post('/validate')
            .send({
                answers: [{ id: ids[1], answer: 'C' }],
            });

        expect(trueValidation.body.validation[ids[1]]).toEqual(true);
        expect(trueValidation.statusCode).toBe(200);
    });

    it('gets all answers', async () => {
        const response = await request(server).get('/answers');

        expect(typeof response.body === 'object');
        expect(response.statusCode).toBe(200);

        for (const answer of response.body) {
            expect(answer).toMatchObject(
                expect.objectContaining({
                    id: expect.any(String),
                    answer: expect.any(String),
                }),
            );
        }
    });

    it('bad route', async () => {
        const response = await request(server).get('/answerss');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({});
    });
});
