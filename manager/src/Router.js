import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop:60 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Log in" initial/>
      </Scene>
      <Scene key="main">
        <Scene
          onRight={() => console.log('right!!!')}
          rightTitle="Add"
          key="employeeList"
          component={EmployeeList}
          title="List of Employees"
        />
      </Scene>
    </Router>
  );
}

export default RouterComponent;
