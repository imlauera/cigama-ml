import React from 'react';
import './App.css';
import GetCountries from './components/GetCountries';


class App extends React.Component {
  render(){
		// acá se ejecuta JS.
    return (
    <div className="container">
			<GetCountries />
    </div>

		);
  }
}

export default App;
