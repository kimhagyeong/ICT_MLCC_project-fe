import { useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

let isLogin = false; // the state of the module
let token = null;
let updateSubscribers = (mode) => {}; //update subscribers callback - do nothing by default

// pre-existing functions to manipulate the state
export const GetLogin = () => isLogin;
export const GetToken = () => token;

export const SetLogin = (_token) => {
 isLogin = true;
 token = _token;
 console.log(token)
 updateSubscribers(isLogin); // call updateSubscribers when setting new state
};

export const SetLogout = () => {
    isLogin = false;
    token = null;
    updateSubscribers(isLogin); // call updateSubscribers when setting new state
};

// new function - custom hook for components to subscribe.
// using getLogin as an init callback to get most relevant state
export const UseLogin = singletonHook(GetLogin, () => {
 const [mode, setMode] = useState(GetLogin);
 updateSubscribers = setMode; // subscribing for further updates
 return mode;
});