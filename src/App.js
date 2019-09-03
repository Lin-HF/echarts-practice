import React, { Component } from 'react';
import logo from './logo.svg';
import Bar from './echarts/bar';
import Pie from './echarts/pie';
import Line from './echarts/line';
import Graph from './echarts/graph';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Bar/>
        <Pie/>
        <Line/>
        <Graph/>
      </div>
    );
  }
}

export default App;
