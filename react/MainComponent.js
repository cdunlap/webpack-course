import React, { Component } from 'react';
import UsersComponent from './UsersComponent';

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>Users</h1>
        <UsersComponent/>
      </div>
    );
  }
}