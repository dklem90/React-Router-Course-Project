import React, { Component } from "react";
import { Route, Link } from 'react-router-dom';
import TeamLogo from './TeamLogo';
import Sidebar from './Sidebar';
import Team from './Team';
import { getTeamNames, getTeam } from '../api';

export default class Teams extends Component {
  state = {
    teamNames: [],
    loading: true,
  }

  componentDidMount = () => {
    getTeamNames()
      .then((teamNames) => {
        this.setState(() => ({
          loading: false,
          teamNames,
        }))
      })
  }
  
  render() {
    const { loading, teamNames } = this.state;
    const { location, match } = this.props;

    return (
      <div className='container two-column'>
        <Sidebar
          loading={loading}
          title='Teams'
          list={teamNames}
          {...this.props}
        />

        {loading === false && location.pathname === '/teams'
          ? <div className='sidebar-instruction'>Select a Team.</div>
          : null}

        <Route path={`${match.url}/:teamId`} render={({ match }) => (
          <div className='panel'>
            <Team id={match.params.teamId}>
              {(team) => team === null
                ? <h1>LOADING</h1>
              : <div style={{width: '100%'}}>
                  <TeamLogo id={team.id} className='center' />
                  <h1 className='medium-header'>{team.name}</h1>
                  <ul className='info-list row'>
                    <li>Established<div>{team.established}</div></li>
                    <li>Manager<div>{team.manager}</div></li>
                    <li>Coach<div>{team.coach}</div></li>
                  </ul>
                  <Link
                    className='center btn-main'
                    to={`/${match.params.teamId}`}
                  >
                    {team.name} Team Page
                  </Link>
                </div>}
            </Team>
          </div>
        )} />
      </div>
    )
  }
}