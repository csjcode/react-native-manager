import React, { Component} from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
// import { Header } from './components/common';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyD6qF_57hsOn3UTCC4tN23gA9y64Ec3oE0',
      authDomain: 'react-native-manager-70a56.firebaseapp.com',
      databaseURL: 'https://react-native-manager-70a56.firebaseio.com',
      storageBucket: 'react-native-manager-70a56.appspot.com',
      messagingSenderId: '452030176681'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, null, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <LoginForm/>
      </Provider>
    );
  }
};

export default App;
