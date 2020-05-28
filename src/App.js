import React from 'react';
import './App.css';
import GetCountries from './components/GetCountries';
import GetProducts from './components/GetProducts';
import Search from './components/Search';


/* Recuperar lista de countries y usar react-autocomplete para que pueda
seleccionarla.*/


class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
		// acá se ejecuta JS.
    return (
    <div className="container">
      <div className="logo">
        Cigama
      </div>
      <hr/>
			<GetCountries />
    </div>

		);
  }
}

export default App;
