import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';

import './App.css';
import { changeLocation, setTotal, fetchData, addField } from './actions';

const availFields = {
  ADM_RATE: {
    param: '2014.admissions.admission_rate.overall',
    name: 'Admission Rate'
  },
  AVG_COST_ATTENDANCE: {
    param: '2014.cost.attendance.academic_year',
    name: 'Avg Cost of Attendance (academic year)'
  }
}

export class App extends Component {
  shouldComponentUpdate = (nextProps) => {
    return !this.props.redux.equals(nextProps.redux);
  };

  baseRequestUrl = () => {
    return 'https://api.data.gov/ed/collegescorecard/v1/schools?school.state='
      + this.props.redux.get('location')
      + '&api_key=SKWPjr6q5hqkNFad7WjeRPdtq61NOH8BUs12NQ6a';
  };

  appendFields = (field='') => {
    return '&_fields=' + this.props.redux.get('fields').push(field).join(",");
  };

  fetchData = (event) => {
    event.preventDefault();
    const requestUrl = this.baseRequestUrl() + this.appendFields();
    this.props.dispatch(fetchData(requestUrl));
  };

  changeLocation = (e) => {
    this.props.dispatch(changeLocation(e.target.value));
    this.props.dispatch(setTotal(0));
  };

  addAdmissionsRate = (e) => {
    let field = e.target.checked ? availFields.ADM_RATE.param : ''
    let requestUrl = this.baseRequestUrl() + this.appendFields(field);
    this.props.dispatch(addField(field));
    this.props.dispatch(fetchData(requestUrl));
  };

  addAvgCostAttendance = (e) => {
    let field = e.target.checked ? availFields.AVG_COST_ATTENDANCE.param : ''
    let requestUrl = this.baseRequestUrl() + this.appendFields(field);
    this.props.dispatch(addField(field));
    this.props.dispatch(fetchData(requestUrl));
  };

  render() {
    let totalSchoolCount = this.props.redux.get('total'),
      location = this.props.redux.get('location'),
      schools = this.props.redux.get('schools') || { size: 0 },
      admissionsRateCol, avgCostAttendanceCol = null
      ;

    let answer = totalSchoolCount === 0 ? null :
      (<h2>There are {totalSchoolCount} colleges in {location}</h2>);

    if (document.getElementById('admissions-rate') && document.getElementById('admissions-rate').checked) {
      admissionsRateCol = (
        <Column
          header={<Cell>{availFields.ADM_RATE.name}</Cell>}
          cell={props => (
            <Cell {...props}>
              {
                schools.get(props.rowIndex).get(availFields.ADM_RATE.param)
              }
            </Cell>
          )}
          width={200}
        />
      )
    }

    if (document.getElementById('avg-cost-attendance') && document.getElementById('avg-cost-attendance').checked) {
      avgCostAttendanceCol = (
        <Column
          header={<Cell>{availFields.AVG_COST_ATTENDANCE.name}</Cell>}
          cell={props => (
            <Cell {...props}>
              {
                schools.get(props.rowIndex).get(availFields.AVG_COST_ATTENDANCE.param)
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
          {avgCostAttendanceCol}
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
        <label htmlFor="admissions-rate">{availFields.ADM_RATE.name}</label>
        <input
          id="avg-cost-attendance"
          type="checkbox"
          onClick={this.addAvgCostAttendance} />
        <label htmlFor="avg-cost-attendance">{availFields.AVG_COST_ATTENDANCE.name}</label>
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
