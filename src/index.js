import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Store from './store'
import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import "./index.css";
import { createGlobalStyle } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";


const { persistor, store } = Store();

const GlobalStyle = createGlobalStyle`
  html {
    background-color: plum;
    box-sizing: border-box;
    
  }
`;
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GlobalStyle />
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
