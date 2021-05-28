export type Question = {
    id: number;
    question: string;
};

export type Validation = Request & {
    body: { id: number; question: string };
};
