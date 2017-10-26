import React, { Component } from 'react';
import UsersComponent from './UsersComponent';
import FxRatesComponent from './FxRatesComponent';

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <div>
          <h1>Users</h1>
          <UsersComponent/>
        </div>
        
        <div>
          <h1>Rates</h1>
          <FxRatesComponent baseCurrency="USD"/>
        </div>
      </div>
    );
  }
}