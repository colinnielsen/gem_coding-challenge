## Description of the problem and solution
I decided to make a basic quiz app with a React + Typescript frontend and an Express + Firebase backend. I was able to easily spin up a hosted nosql database in Firebase and started making queries in minutes! This solution overall was easy to implement, and hosting the server on Firebase allows for a high level of security and predictibility without having to handle any DevOps myself.

### Backend
This app focuses more on the backend as I started the backend first. I am satisified with it's architecture. The server's complex logic is obfuscated into helper functions, the folder structure is clear, and it is clear which each route is doing. I also setup the app to allow for database injection (for testing). Testing was definitely the most challenging. I unfortunately followed a rabbit trail into some libraries that claimed to mock the `Firestore` object for me in Jest so I could create more rigorous unit tests. I kept hitting issues with conflicting firebase versions and couldn't use these libraries, so instead I created my own object that spoofed some of the basic functionality. 
I purposefully seperated the `questions` and `answers` collection. All the validation is done on the server side for security reasons. A user passes the question id and an answer, and the server will tell them if the answer is valid.
If I had more time on the backend, I would make better unit tests - including failing assertions - and add integration testing with Firebase emulators.


### Frontend
The frontend ended up being very simplistic due to wasted time on bundler issues. Overall I like the structure of the app, with questions and user answers being stored in global state, and each question being routed. I wanted to emphasize a clean frontend that: abstracts server callouts, is keyboard accessible, has type-safety via Typescript, and extends global state efficiently. 

If I had more time, I would make one of two refactors: 
  1. refactor the quiz so the user sees if they have guessed correctly
  2. save answer validation to the end of the test.

The code implementation of `Quiz` and `QuestionCard` could be cleaned up further as well.

### Installation
#### Frontend
  1. `git clone https://github.com/colinnielsen/gem_coding-challenge`
  2. `cd frontend/`
  3. `yarn | npm i`
  4. `yarn start | npm start`

#### Backend
The server is up and running at `FIREBASE_URL` so no need to run it locally to test.

To test the server
   1. `cd functions/`
   2. `yarn test | npm test`


## Link to app [here](https://gemcodinginterview.web.app/)

---


Green Egg Media Web App Coding Challenge
========================================

Credit to Udemy for the foundation of this challenge.

Thank you for you interest in working with Green Egg Media. Based on our conversations, we feel like you could be a good fit for the team. Before we make any final decisions, we need to understand what it would be like to actually work with you day to day. To do this, we're asking you to complete a small coding challenge project that will help us understand your approach to problems and how you go about solving them. This is NOT a test in the traditional sense - this is an opportunity for you to express yourself and to help us see your skills in action.

Functional spec
---------------

Please implement a quiz-taking system.

* The system should be a full-stack web application
    * It should have a backend API to get the questions
    * And a frontend UI to answer them
* The quiz can handle one or more questions
* The quiz only has multiple-choice questions with one right answer each
* The app should tell the user how he or she did at the end of the quiz

What to do
----------

* Do make use of frameworks, libraries, plugins, anything that helps you build this (GEM uses Lumen/Laravel or Express on the backend and React on the frontend, if you're looking for ideas)
* Do host the app somewhere that we can see it working the way you intend (Digital Ocean is cheap and easy if you need to set something up)
* Do apply common sense to the scale of the app - quizzes can have tons of features, limit yourself to what you _need_
* Do have fun!

What not to do
--------------

* Do not make use of an actual quiz library
* Do not worry about creating an admin interface for quiz or question creation, feel free to define the quiz directly in the database
* Do not worry about user authentication
* Do not spend too much time on this - we estimate you should be able to build something workable in 3-4 hours (of course, take the time you need, but don't wear yourself out with this challenge)
* Do not forget to document your application

Documentation
-------------

Please write your README as if it was for a real client project that you would work on with our team. Include the following items:

* Description of the problem and solution
* Whether the solution focuses on back-end, front-end or if it's full stack
* Reasoning behind your technical choices, including architectural
* Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project
* Instructions for getting a copy running locally
* Link to the hosted application where it you have it running for review

How we review
-------------

Your application will be reviewed at least by GEM's lead developer.

**We value quality over feature-completeness**. It is fine to leave things aside provided you call them out in your project's README. For the features you decide to include, the code should be as close to production-ready as possible.

The aspects of your code we will assess include:

* **Correctness**: does the application do what was asked? If there is anything missing, does the README explain why it is missing?
* **Architecture**: does the application handle requests and data efficiently? Is the code structured in a reusable and easily adaptable way? Does the database design make sense?
* **Code quality**: is the code simple, easy to understand, and maintainable?  Are there any code smells or other red flags? Is the coding style consistent with the language's guidelines? Is it consistent throughout the codebase?
* **Testing**: do you have some unit and/or integration tests?
* **Technical choices**: do choices of libraries, databases, architecture etc. seem appropriate for the chosen application?

--------------
