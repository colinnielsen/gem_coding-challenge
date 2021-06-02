export type Choices = {
    value: string;
    label: string;
};

export type Question = {
    id: string;
    question: string;
    choices: Choices[];
};
