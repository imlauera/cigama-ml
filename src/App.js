import React from 'react';
import './App.css';
import GetCountries from './components/GetCountries';


class App extends React.Component {
  render(){
    return (
    <div className="container">
			<GetCountries />
    </div>

		);
  }
}

export default App;
