import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from './App';

let div = document.createElement('div');
div.id = "app";
document.body.appendChild(div);    
ReactDOM.render(<App />, document.getElementById("app"));