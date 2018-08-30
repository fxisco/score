import React, { Component } from 'react';
import './App.css';

const APP_NAME = 'veteScore';

const DEFAULT_TEAMS = {
  1: {
    name:'Pibes',
    points: 0,
    color: '#f44336'
  },
  2: {
    name:'Mapuches',
    points: 0,
    color: '#e91e63'
  },
  3: {
    name:'Parces',
    points: 0,
    color: '#d500f9'
  },
  4: {
    name:'Chamos',
    points: 0,
    color: '#9575cd'
  },
  5: {
    name:'Kapes',
    points: 0,
    color: '#3d5afe'
  },
  6: {
    name:'Patas',
    points: 0,
    color: '#2979ff'
  },
  7: {
    name:'Brasucas',
    points: 0,
    color: '#ffff00'
  },
  8: {
    name:'Boludos',
    points: 0,
    color: '#ffb300'
  },
  9: {
    name:'Los man',
    points: 0,
    color: '#ff5722'
  },
  10: {
    name:'Cumpas',
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
          <b>{name}</b>
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
        <h1 className="text-center py-5">Tabla de puntuaciones</h1>
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
