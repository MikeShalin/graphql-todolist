**Todo List with Apollo GraphQL and React**

To start the app, you need to:
- Create a file named .env
- Set up a database on cloud.mongodb.com
- Add the following to it:
  ```USER_DB=user PASSWORD_DB=pass URI_DB=mongodb NAME_DB=name-db PORT=3005 GRAPHQL_SERVER=localhost:3005```
- you should execute **npm start**

The app will start at http://localhost:3005/

Since the app uses websockets, if you want to see it in action, you should open the app in two different browser tabs