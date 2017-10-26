import React, { Component } from 'react';
import UsersComponent from './users/UsersComponent';
import FxRatesComponent from './fx/FxRatesComponent';

require('../styles/main.scss');

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="container">
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