import React, { Component} from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
// import { Header } from './components/common';

class App extends Component {
  render(
    return (
      <Provider store={createStore(reducers)}>
        <View style={{flex:1}}>
          <Text>Root component</Text>
          {/* <Header headerText="Tech Stack" /> */}
        </View>
      </Provider>
    );
  );
};

export default App;
