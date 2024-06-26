## Elevator Pitch
---
Have you ever wanted pictures of cool things like dragons, faries or goblins without having to slog through the turpid mire of the internet? My RPG Visual can help. Brows a family-friendly library of only fantasy applicable images and save the ones you would like to use later. You can see in real time how many people like each image! You can even upload your own images if our library dosen't meet your needs.

## Design
---
### Login Page: 
![Login Page Mockup](Login.png)

### Gallery Page: 
![Gallery Page Mockup](Gallery.png)

### Library Page: 
![Library Page Mockup](my_library.png)

### Here is a diagram of how the users interact with the server: 
![Server Diagram](server-diagram.webp)

## Key Features
---
- Https login
- The ability to browse a library of images stored in an AWS S3 Bucket
- The ability to like an image
- Likes for all images displayed in real time
- The ability to save an image to your personal library
- The ability to upload an image to your personal library

## Technologies
---

I am planning to use all the required technologies in these ways

- **HTML** - Use proper structure for HTML pages with hyperlinks between each page.
- **CSS** - Use CSS to create dynamic layouts with a clean design that facilitates the visual nature of the app
- **JavaScript** - Use Javascript to login, fetch image URLs from the database, make requests to the server when images are added to the library or uploaded, and update likes in real time
- **Service** - Backend service with endpoints for:
  - login
  - fetch images
  - add image to a user library table in the DB
  - Get all of the images related to filters the user selects
- **DB/Login** - I will store info related to users, their image libraries, and their liked images in the DB. I will also store all of the image URLs for the Gallery here.
- **WebSocket** - As a user likes an image, that like will update in real-time for all the other users on images that they are viewing
- **React** - Use the react framework for final application

## HTML deliverable

My application structure has been built using HTML

- **HTML pages** - 5 HTML pages that will be the login and account creation system, image gallery and personal image library pages.
- **Links** - Links between all the pages containing the functionality for the site are in the header to each page. Link to the 'create account' flow is tied to the 'create account' button in index.html
- **Text** - Each image and spots to like the images are represented by short descriptions of the names and number of likes. A good example is the gallery.html page.
- **Images** - Right now I'm using 'img_placeholder.png' (See gallery.html and my-library.html) as a placeholder for all the images in my website. I've got an S3 bucket set up to store and retrieve the images eventually.
- **DB/Login** - I have a username, password box, and submit button for login (index.html). User data, including a collection of URLs for the images on the my-library.html page are going to be stored on my DB.
- **3rd party service/API** - I plan to use a 3rd party service for email validation in the 'account confirmation' page.
- **WebSocket** - The likes on the images on the 'gallery.html' page will use a websocket to update in real-time

## CSS Deliverable
- **Properly styled CSS Header, footer, and main content body** - Styling for these elements is done using bootstrap and in the `CSS/style.css` file.
- **Properly styled CSS navigation elements** - Nav bar styled with bootstrap
- **Responsive to window sizing** - All pages dynamically adapt desktop, tablet and mobile sizes
- **Properly styled CSS application elements** - All elements are styled using bootstrap and supplemental CSS. Main site styles are in `CSS/style.css`, the CSS for the gallery elements in the `gallery.html` and `my-library.html` pages is in `CSS/gallery-style.css` and the styles for the account confirmation page are in `CSS/account-confirmation.css`.
- **Properly styled CSS application text content** - The bootstrap default font worked great for the design I had in mind.
- **Properly styled CSS application images** - All images on he `gallery.html` and `my-library.html` pages sized and bordered with css in `gallery-styles.css`

## Javascript Deliverable
- **Javascript Support For Future Login** - functions for login and account creation are in the `validation-service.js` file and `login-page.js` file.
- **JS support for future DB data** - User info (collected using the above functions and stored in `localStorage`) will be stored in the db.
- **JS support for future websocket** - The `randomLikes`function in `user-specific-pages.js` contains a random simulation of likes on pictures coming in from other users.
- **JS support for application interaction logic** - contained in the `user-specific-pages.js` file and the `my-library.js` file.
- **Important Note** - You will need to actually create an account to access the main site and all the functionality. Any username, password and email will do. I don't save any of it.

## Service Deliverable
- **Create an HTTP Service using Node.js and Express** - See `main.js`.
- **Frontend served up using express static middleware** - See `main.js`.
- **Your frontend calls 3rd party service endpoints** - See `validation-service.js` line 57, `validateEmail` function.
- **Your backend provides service endpoints** - see `main.js`.
- **Your frontend calls your service endpoints** - see `my-library.js`, `validation-service.js` and `gallery.js`.

## Login Deliverable
- **Supports new user registration** - see `index.js` lines 36-55, `database.js`lines 13-25
- **Supports existing user authentication** - see `index.js` lines 19-29, 58-74, `database.js` lines 30-54
- **Stores application data in MongoDB** - see `database.js`, lines 57-72
- **Stores and retrieves credentials in MongoDB** - see `index.js` lines 36-55, `database.js`lines 13-25
- **Restricts application functionality based upon authentication** see `index.js` lines 58-74

## Websocket Deliverable
- **Feature Overview** - I used a websocket connection to manage the 'likes' feature. You can check it out in the `gallery.html` page.
- **Backend Listens for WebSocket connection** - see `index.js` lines 113-118 - listening for the websocket here, `websocket.js` lines 8-15 - handling the upgrade here.
- **Frontend makes WebSocket Connection** - See `initializeWebsocket()` on lines 76-91 of `gallery.js`. I use the 'socket' global object (initialized on line 3) to access the connection.
- **Data sent over WebSocket Connection** - on line 122 of `gallery.js`, data is sent to the server, and on lines 36-38 of `websocket.js` data is sent back to the client to update the likes. That data is handled on the client side by the function `applyLikes()` found on lines 133-148 of `gallery.js`
- **WebSocket data displayed in the application interface** - this is also done in the `applyLikes()` function, specifically on lines 136-148. This data is displayed as the number of likes for each picture.

## React Deliverable
- **Bundled using Vite** - see `vite.config.js`
- **Multiple functional react components** - See `app.jsx`, `login.jsx`, and `create_account.jsx` NOTE: The Gallery and Login components are not functional at the time that I turned this in. Hoping to finish them tomorrow.
- **React router** - see `app.jsx`, specifically the `return` statement
- **React hooks** - Both state and effect hooks are used in `login.jsx`. See lines 5-26. State hooks are also used in `app.jsx` and `login.jsx`, in the opening lines of the component functions.
