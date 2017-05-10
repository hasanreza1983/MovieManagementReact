# Description

CRUD web application for movie management. Written using React.js on the front end and  Node.js, Express and Mongo DB on the back end. We also use [Material UI](http://www.material-ui.com/#/ "Material UI") library for react components.

# Screenshots

Main page:

<img src ="https://github.com/giorgim/MovieManagementReact/blob/master/images/main.png">    

List of movies:       

<img src ="https://github.com/giorgim/MovieManagementReact/blob/master/images/list.png">

Search page:

<img src ="https://github.com/giorgim/MovieManagementReact/blob/master/images/search_movies.png">

# How to run the project 

1. Clone the project
2. First, type and run: <code>npm install</code> from the root folder
3. Now, <code>cd</code> into <code>client</code> directory
4. type and run: <code>npm install</code>
5. Finally, move back to the root directory and type: <code>node index.js</code>
6. Now you should be able to access the app at: localhost: 3000

**Mongo database**: You need to have mongo database service running.

**If you want to update the client app**: The client application (written in React.js) is located inside the <code>client</code> folder of the root folder.
If you make any changes to the client application, you need to run <code>npm run build</code> inside the <code>client</code> folder. Then, to run the app, you need to move to the root folder again and type: <code>node index.js</code>
