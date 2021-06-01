const collections = {
    questions: {
        docs: [
            {
                id: '6uUwiBKtprG2LOfi8F5g',
                data: () => ({
                    question: 'How much wood could a wood chuck chuck?',
                    choices: [
                        {
                            value: 'Too much wood!',
                            label: 'A',
                        },
                        {
                            value: '700 pounds',
                            label: 'B',
                        },
                        {
                            value: 'What is a woodchuck?',
                            label: 'C',
                        },
                    ],
                }),
            },
            {
                id: 'PhionxNwDCwTd1fMe5by',
                data: () => ({
                    question: 'When was the war of 1812?',
                    choices: [
                        {
                            label: 'A',
                            value: 'Eighteen Twelve?',
                        },
                        {
                            value: '1813',
                            label: 'B',
                        },
                        {
                            label: 'C',
                            value: '1812!!',
                        },
                    ],
                }),
            },
            {
                id: 'lqosjhxhLhtPJt3RN4Qx',
                data: () => ({
                    question: 'Kiev is the capital of which country?',
                    choices: [
                        {
                            value: 'Ireland',
                            label: 'A',
                        },
                        {
                            label: 'B',
                            value: 'Belarus',
                        },
                        {
                            label: 'C',
                            value: 'Ukraine',
                        },
                    ],
                }),
            },
        ],
    },
    answers: {
        docs: [
            {
                id: '6uUwiBKtprG2LOfi8F5g',
                data: () => ({
                    answer: 'A',
                }),
            },
            {
                id: 'PhionxNwDCwTd1fMe5by',
                data: () => ({
                    answer: 'C',
                }),
            },
            {
                id: 'lqosjhxhLhtPJt3RN4Qx',
                data: () => ({
                    answer: 'C',
                }),
            },
        ],
    },
};

export default {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    collection: (route: 'questions' | 'answers') => {
        switch (route) {
            case 'questions':
                return {
                    get: () => Promise.resolve(collections[route]),
                };
            case 'answers': {
                return {
                    get: () => Promise.resolve(collections[route]),
                };
            }
            default:
                return { get: () => [] };
        }
    },
};
