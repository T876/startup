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
