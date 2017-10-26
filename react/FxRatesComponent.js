import React, { Component } from 'react';
import api from '../api';

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
      dailyRates.push(<p key={currency}>{currency} - {rate}</p>);
    }
    
    return (
      <div>
        <h2>Base {baseCurrency} Date {date}</h2>
        {dailyRates}
      </div>
    );
  }
}