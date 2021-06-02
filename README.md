# Solution
## Description of the problem and solution
I decided to make a basic quiz app with a react + typescript frontend and an Express + Firebase backend. I was able to easily spin up a hosted nosql database in Firebase and started making queries in minutes! This solution overall was easy to implement, and hosting the server on Firebase allows for a high level of security and predictibility without having to handle any DevOps myself.
This app focuses more on the backend as I started the backend first. I am most satisified with the architecture of the backend as it's complex logic is obfuscated into helper functions. The folder structure is clear and it is clear which each route is doing. I also setup the app to allow for database injection (for testing).

## Challenges
My biggest challenges for this project was test driven development. I had a tough time implementing different library‘s, specifically to mark the fire store database I was using. Are utilized dependency injection and a fake database object to simulate what fire store I would return from my server so that it could be tested and isolation.
If I had more time, I would definitely more battle hardened testing methods, integration testing and flushing out all my tests to include failing assertions as well. 

Whether the solution focuses on back-end, front-end or if it's full stack
Reasoning behind your technical choices, including architectural
Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project
Instructions for getting a copy running locally
Link to the hosted application where it you have it running for review
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
