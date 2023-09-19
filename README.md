# APIHexagonal

API to Do List, con typescript. Aplicando una arquitectura hexagonal y tested con Jest y ThunderClient
This project is a ToDoList application developed in Typescript built using Node.js and Express.js, following the principles of hexagonal architecture and DDD. The app connects to MongoDB database.

## Technologies

- Typescript
- Node.js
- Express.js
- mongoose/MongoDB
- Jest

## Getting Started

Follow the steps below to set up and run the Todo List project on your local machine:

1. Clone the repository:

```bash
git clone https://github.com/IvandeGea/APIHexagonal
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

- Install MongoDB and ensure it's running on your system.
- Configure the MongoDB connection settings in the application.

4. Start the server:

```bash
npm start
```

## Features

- View a list of all tasks
- View a task (id)
- Create a new task with a title
- Mark tasks as completed (id)
- Delete tasks (id)

## Testing

To run the tests, use the following command:

    npm test

The tests are written using Jest.
