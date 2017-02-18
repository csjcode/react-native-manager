import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE
} from './types';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {

  const { currentUser } = firebase.auth();
  // console.log(`/users/${currentUser.uid}/employees` + ' ' + name, phone, shift);
  // firebase.database.enableLogging(true);
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => Actions.main().employeeList(type: 'reset'));
  };
};
