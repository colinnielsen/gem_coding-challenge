export type Choices = {
    value: string;
    label: string;
};

export type QuestionCardProps = Question & {
    number: number;
    answers:
        | {
              [id: string]: boolean;
          }
        | {};
    loading: boolean;
    next: (answer: string) => void;
};

export type Question = {
    id: string;
    question: string;
    choices: Choices[];
};

export type Answer = {
    id: string;
    answer: string;
};

export type Validation = {
    id: boolean;
};
