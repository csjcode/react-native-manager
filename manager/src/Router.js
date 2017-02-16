import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop:60 }}>
      <Scene key="login" component={LoginForm} title="Please Log in" initial/>
      <Scene key="employeeList" component={EmployeeList} title="List of Employees" />
    </Router>
  );
}

export default RouterComponent;
