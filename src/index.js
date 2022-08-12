import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {createStore} from "redux";
import {Quizs} from "./Store/Quiz";

const store = createStore(Quizs)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>
  <App/>
</Provider>);