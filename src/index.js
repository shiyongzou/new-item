import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import Hander from './component/hander/hander'; 

import './sass/index.scss';
ReactDOM.render(
  <div className="App">
      <Hander></Hander>
      </div>,
  document.getElementById('app')
);

