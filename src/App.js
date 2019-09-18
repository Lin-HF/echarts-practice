import React, { Component } from "react";
import logo from "./logo.svg";
import Bar from "./echarts/bar";
import Pie from "./echarts/pie";
import Line from "./echarts/line";
import Graph from "./echarts/graph";
import Request from './Http/request';
import Event from './Event';
import { NavLink, Switch, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink to="/bar">Bar</NavLink>
            </li>
            <li>
              <NavLink to="/pie">Pie</NavLink>
            </li>
            <li>
              <NavLink to="/line">Line</NavLink>
            </li>
            <li>
              <NavLink to="/graph">Graph</NavLink>
            </li>
            <li>
              <NavLink to="/http">Http</NavLink>
            </li>
            <li>
              <NavLink to="/event">Event</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/bar" component={Bar} />
          <Route path="/pie" component={Pie} />
          <Route path="/line" component={Line} />
          <Route path="/graph" component={Graph} />
          <Route path="/http" component={Request} />
          <Route path="/event" component={Event} />
          <Route
            path="/"
            render={() => (
              <div>
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                  To get started, edit <code>src/App.js</code> and save to
                  reload.
                </p>
              </div>
            )}
          />
        </Switch>

        {/* <Bar />
        <Pie />
        <Line />
        <Graph /> */}
      </div>
    );
  }
}

export default App;
