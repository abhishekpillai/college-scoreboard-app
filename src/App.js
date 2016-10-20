import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';

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

  addAdmissionsRate = (e) => {
    let requestUrl = 'https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name';
    if (e.target.checked) {
      requestUrl += ',2014.admissions.admission_rate.overall';
    }
    requestUrl += '&school.state=';
    requestUrl += this.props.redux.get('location');
    requestUrl += '&api_key=SKWPjr6q5hqkNFad7WjeRPdtq61NOH8BUs12NQ6a';
    this.props.dispatch(fetchData(requestUrl));
  };

  render() {
    let totalSchoolCount = this.props.redux.get('total'),
      location = this.props.redux.get('location'),
      schools = this.props.redux.get('schools') || { size: 0 },
      admissionsRateCol = null
      ;

    let answer = totalSchoolCount === 0 ? null :
      (<h2>There are {totalSchoolCount} colleges in {location}</h2>);

    if (document.getElementById('admissions-rate') && document.getElementById('admissions-rate').checked) {
      admissionsRateCol = (
        <Column
          header={<Cell>Admission Rate</Cell>}
          cell={props => (
            <Cell {...props}>
              {
                schools.get(props.rowIndex).get('2014.admissions.admission_rate.overall')
              }
            </Cell>
          )}
          width={200}
        />
      )
    }

    let table = schools.size === 0 ? null :
      (
        <Table
          rowsCount={schools.size}
          rowHeight={50}
          headerHeight={50}
          width={1000}
          height={500}>
          <Column
            header={<Cell>Name</Cell>}
            cell={props => (
              <Cell {...props}>
                {
                  schools.get(props.rowIndex).get('school.name')
                }
              </Cell>
            )}
            width={200}
          />
          {admissionsRateCol}
        </Table>
      )

    return (
      <div className="App">
        <div className="App-header">
          <h1>College</h1>
          <form onSubmit={this.fetchData} >
            <label>I want to know how many colleges there are in the state of
              <input
                placeholder="State, i.e. NY"
                type="text"
                value={location}
                onChange={this.changeLocation} />
            </label>
          </form>
        </div>
        {answer}
        <input
          id="admissions-rate"
          type="checkbox"
          onClick={this.addAdmissionsRate} />
        <label htmlFor="admissions-rate">Admissions Rate</label>
        {table}
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
