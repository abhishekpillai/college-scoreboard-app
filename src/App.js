import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { changeLocation, setTotal, fetchData } from './actions';

export class App extends Component {
  shouldComponentUpdate = (nextProps) => {
    return !this.props.redux.equals(nextProps.redux);
  };

  fetchData = (event) => {
    event.preventDefault();
    const requestUrl = 'https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name&school.state='
      + this.props.redux.get('location')
      + '&api_key=SKWPjr6q5hqkNFad7WjeRPdtq61NOH8BUs12NQ6a';
    this.props.dispatch(fetchData(requestUrl));
  };

  changeLocation = (e) => {
    this.props.dispatch(changeLocation(e.target.value));
    this.props.dispatch(setTotal(0));
  };

  // Data gov API KEY -> SKWPjr6q5hqkNFad7WjeRPdtq61NOH8BUs12NQ6a
  render() {
    console.log('rendering');
    let answer = this.props.redux.get('total') === 0 ? null :
      (<h2>There are {this.props.redux.get('total')} colleges in {this.props.redux.get('location')}</h2>);

    return (
      <div className="App">
        <div className="App-header">
          <h1>College</h1>
          <form onSubmit={this.fetchData} >
            <label>I want to know how many colleges there are in the state of 
              <input
                placeholder={"State, i.e. NY"}
                type="text"
                value={this.props.location}
                onChange={this.changeLocation} />
            </label>
          </form>
        </div>
        {answer}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // redux needs this to be a regular JS object
  // and not a ImmutableJS obj
  return {
    redux: state
  };
}

export default connect(mapStateToProps)(App);
