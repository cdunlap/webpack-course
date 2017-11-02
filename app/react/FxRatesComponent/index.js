import React, { Component } from 'react';
import api from 'api';

require('./style.css');

export default class FxRatesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixerResponse: []
    };
  }
  
  componentDidMount() {
    const rates = api.getExchangeRates(this.props.baseCurrency)
    .done(fixerResponse => {
      this.setState({
        fixerResponse
      });
    });
  }
  
  render() {
    let dailyRates = [];
    const { fixerResponse: { rates } } = this.state;
    const { fixerResponse: { date } } = this.state;
    const { baseCurrency } = this.props;
    
    for(const currency in rates) {
      const rate = rates[currency];
      dailyRates.push(<li className="list-group-item" key={currency}>{currency} - <i className="fa fa-usd"></i>{rate}</li>);
    }
    
    return (
      <div id="fxContainer">
        <h2><i className="fa fa-calendar"></i> Base {baseCurrency} Date {date}</h2>
        <ul className="list-group">
          {dailyRates}
        </ul>
      </div>
    );
  }
}