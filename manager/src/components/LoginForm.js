import React, { Component } from 'react';
// import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {
  onEmailChange(text){
    
  }
  render() {
    return(
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="password"
            placeholder="password"
          />
        </CardSection>
        <CardSection>
          <Button>Login</Button>
        </CardSection>
      </Card>
    );
  }
}

export default LoginForm;
