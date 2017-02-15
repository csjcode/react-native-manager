import { EMAIL_CHANGED } from './types';
import { PASSWORD_CHANGED } from './types';
import firebase from 'firebase';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = (email, password) => {
  return {
    firebase.auth().signInWithEmailAndPassword(email, password);
      .then(user => console.log(user))
  };
};
