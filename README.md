# Todo application demonstration

full stack project using MERN stack + GraphQL with Test Driven Development

#### NOTE: PROJECT STILL IN PROGRESS

this project contains server and client

## Server

Server stack contains:
- GraphQL
- NodeJS
- Express

And upcoming component:
- MongoDB

For now, this project could demonstrate how to get NodeJS to provide GraphQL API without using database but in memory. As you can see, with TDD approach. It is easy to mock database behavior. See `todo-server/src/index.js` for an instance. so there's no need to hard coded in the production code. but do mocking from an api user which is the `index.js`. so next thing to go is to add database gateway without changing my existing structure. then i could add more code incrementally which is the nature of TDD.

## Client

The technology i used is ReactJS from Facebook which provide very handy CLI to create the project (`create-react-app`). With Jest (testing framework by Facebook), it quite easy to just add test code and done, zero configuration or any setup. And to make project a little more complex i add Redux (the global state management library) to this stack.

### In Boundary and Out Boundary

I'm the TDDer focusing only do test first with In Boundary components. so i have to describe which of these components are in or out boundary.

**in boundary**
- Redux reducers
- Redux action creators
- API service interfaces

**out boundary**
- React components
- Redux store

Only in boundary components will have `__tests__` folder beside. and the test is aiming only the component task. for instance, Redux reducers job is to transform incoming `state` and `action` into `nextState`. then just test only if the input `state` and `action` are specified then it should return expecting `nextState`.

---
###  Author
Poldet Assanangkornchai [@PoldetA](https://twitter.com/PoldetA)