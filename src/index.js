import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from './App';

window.onload = function() {
    let iframe = document.createElement('iframe');
    iframe.id = "iframe";
    document.body.appendChild(iframe);   

    window.addEventListener('DOMContentLoaded', function(e) {
        iframe.height = document.body.scrollHeight;
    });

    window.addEventListener('DOMContentLoaded', function(e) {
        iframe.height = document.body.scrollHeight;
    });
    window.onresize = function reportWindowSize() {
        iframe.height = document.body.scrollHeight;
    };      

    ReactDOM.render(<App />, document.getElementById("app"));
};