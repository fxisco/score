import React, { Component } from 'react';
import './App.css';
import logo from './logo.png'

const APP_NAME = 'veteScore';

const DEFAULT_TEAMS = {
  1: {
    name:'Grupo 1',
    points: 0,
    color: '#f44336'
  },
  2: {
    name:'Grupo 2',
    points: 0,
    color: '#e91e63'
  },
  3: {
    name:'Grupo 3',
    points: 0,
    color: '#d500f9'
  },
  4: {
    name:'Grupo 4',
    points: 0,
    color: '#9575cd'
  },
  5: {
    name:'Grupo 5',
    points: 0,
    color: '#3d5afe'
  },
  6: {
    name:'Grupo 6',
    points: 0,
    color: '#2979ff'
  },
  7: {
    name:'Grupo 7',
    points: 0,
    color: '#ffff00'
  },
  8: {
    name:'Grupo 8',
    points: 0,
    color: '#ffb300'
  },
  9: {
    name:'Grupo 9',
    points: 0,
    color: '#ff5722'
  },
  10: {
    name:'Grupo 10',
    points: 0,
    color: '#607d8b'
  },
}


const Team = ({ color, id, points, name, handleAddPoint, handleRemovePoint }) => {
  return (
    <div key={`team-item-${id}`} className="col-md-1">
      <div className="row pb-3">
        <div className="col-sm-12 text-center">
          <b className="team-points">{points}</b>
        </div>
      </div>
      <div className="row pb-3">
        <div className="col-sm-12 text-center">
          <b className="team-title">{name}</b>
        </div>
      </div>
      <div className="row pb-3">
        <div className="col-sm-6">
          <button className="button-team bg-success" onClick={handleAddPoint}><i className="fa fa-plus text-white"></i></button>
        </div>
        <div className="col-sm-6">
          <button className="button-team bg-danger" onClick={handleRemovePoint}><i className="fa fa-minus text-white"></i></button>
        </div>
      </div>
      <div className="row justify-content-center pb-3">
        {Array.from({length: points}, (v, k) => {
          return (
            <div key={`${id}-points-${k}`} className="col-sm-1 m-2 shadow" style={{ backgroundColor: color }}>
              &nbsp;
            </div>
          );
        })}
      </div>
    </div>
  )
};

class App extends Component {
  constructor(props) {
    super(props);

    const teamsData = localStorage.getItem(APP_NAME);

    this.state = {
      teams:  JSON.parse(teamsData) || DEFAULT_TEAMS
    };

    this.handleAddPoint = this.handleAddPoint.bind(this);
    this.handleRemovePoint = this.handleRemovePoint.bind(this);
  }

  handleAddPoint(id) {
    const { teams } = this.state;

    this.setState({
      teams: {
        ...teams,
        [id]: {
          ...teams[id],
          points: teams[id].points + 1
        }
      }
    }, () => {
      localStorage.setItem(APP_NAME, JSON.stringify(this.state.teams));
    });
  }

  handleRemovePoint(id) {
    const { teams } = this.state;
    const points = teams[id].points - 1 > 0 ? teams[id].points - 1 : 0;

    this.setState({
      teams: {
        ...teams,
        [id]: {
          ...teams[id],
          points
        }
      }
    }, () => {
      localStorage.setItem(APP_NAME, JSON.stringify(this.state.teams));
    })
  }

  render() {
    return (
      <div className="container-fluid py-5">
        <img className="logo" src={logo} alt="Logo Complevivencia 2019" />
        <h1 className="text-center py-5 title">Puntuaciones</h1>
        <div className="row justify-content-center">
          {Object.keys(this.state.teams).map((id) => {
            const { color, name, points } = this.state.teams[id];

            return (
              <Team
                key={`team-${id}`}
                id={id}
                color={color}
                name={name}
                points={points}
                handleAddPoint={this.handleAddPoint.bind(null, id)}
                handleRemovePoint={this.handleRemovePoint.bind(null, id)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
