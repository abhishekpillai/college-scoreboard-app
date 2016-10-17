import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { changeLocation, setTotal, fetchData } from './actions';

class App extends Component {
  fetchData = (event) => {
    event.preventDefault();
    const requestUrl = 'https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name&school.state='
      + this.props.location
      + '&api_key=SKWPjr6q5hqkNFad7WjeRPdtq61NOH8BUs12NQ6a';
    this.props.dispatch(fetchData(requestUrl));
  };

  changeLocation = (e) => {
    this.props.dispatch(changeLocation(e.target.value));
    this.props.dispatch(setTotal(0));
  };

  // Data gov API KEY -> SKWPjr6q5hqkNFad7WjeRPdtq61NOH8BUs12NQ6a
  render() {
    let answer = this.props.total === 0 ? null :
      (<h2>There are {this.props.total} colleges in {this.props.location}</h2>);

    return (
      <div className="App">
        <div className="App-header">
          <h1>College</h1>
          <form onSubmit={this.fetchData} >
            <label>I want to know how many colleges in 
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
  return {
    location: state.location,
    total: state.total
  };
}

export default connect(mapStateToProps)(App);
