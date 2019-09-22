import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render(){
	  return (
		<button onClick={this.props.onClick}>This button has ben clicked {this.props.clicks} times.</button>
	  );
	}
}

export default App;
