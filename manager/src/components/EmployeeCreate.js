import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common/';

class EmployeeCreate extends Component {
  render() {
    return(
      <Card>
        <CardSection>
          <Input
            label="name"
            placeholder="Jane"
          />
        </CardSection>
        <CardSection>
          <Input
            label="phone"
            placeholder="555-5555"
          />
        </CardSection>
        <CardSection>

        </CardSection>
        <CardSection>
          <Button>
            Save
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default EmployeeCreate;
