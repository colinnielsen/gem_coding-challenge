export type Question = {
    id: number;
    question: string;
};

export type Choices = {
    value: string;
    label: string;
};

export type DBQuestion = {
    id: string;
    question: string;
    choices: Choices[];
};

export type Validation = { [id: string]: boolean };

export type Answer = {
    id: string;
    answer: string;
};
