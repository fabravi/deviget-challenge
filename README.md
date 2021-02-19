# Front End Challenge

## Technologies used

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- I decided to use [Typescript](https://create-react-app.dev/docs/adding-typescript/).
- The styling was done using [SASS](https://create-react-app.dev/docs/adding-a-sass-stylesheet/) modules from scratch.
- It uses [Jest](https://create-react-app.dev/docs/running-tests/) as the test runner.
- It uses [Redux Toolkit](https://redux-toolkit.js.org/introduction/quick-start) for state managing.
- For the api calls, it uses [Axios](https://github.com/axios/axios).
- Routing done using [React Transition Group](https://reactrouter.com/web/guides/quick-start).
- Uses [React Transition Group](https://reactcommunity.org/react-transition-group/) for animations.
- Uses [Moment](https://momentjs.com/) to work with dates.
- State persistence done using [Redux Persist](https://github.com/rt2zz/redux-persist).
- Developed using [Prettier](https://prettier.io/).

## How it works

- It loads first 10 posts.
- Uses infinite scroll to fetch 10 more posts up to a limit of 50.
- Has 4 different routes:
  - `/`: Posts list.
  - `/:id`: Posts list with a post active.
  - `/gallery`: Gallery.
  - `/gallery/:id`: A picture from the posts.
- Pictures are opened on `/gallery/:id` using the post id.
- Persistence is used for almost all elements in the state, with the following exception: posts are comming from reddit and they could change often, therefore, the app is checking the last date of update on refresh to fetch for a new posts list. If last update of posts lists was done more than 60 seconds ago, it puts in persistence's blacklist the posts list. This feature works only when reloading the app.
- As posts list may vary, I used a map to store their states. There's also the need to check if all incoming posts were yet dismissed to adapt to that state.
- You can navigate directly to a posts to show it open on load. If there's not in the list, redirect to `/`.

## Command line scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
