import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Content/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const cors = require("cors");

// App.use(
//   cors({
//       origin:"http://localhost:3000",
//       methods: ['GET','POST','DELETE','PUT','PATCH']
//   })
// );
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
