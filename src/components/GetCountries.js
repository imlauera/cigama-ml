/* this file contain a bug, find it.*/

import React from 'react';
import axios from 'axios';
import GetCategories from './GetCategories';
import Search from './Search';
import './GetCountries.css'

export default class GetCountries extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      countries: [],
      countryChange: '',
      selectedCountry: ''
    };
    this.handleChange_ = this.handleChange_.bind(this)
    this.handleSubmit_ = this.handleSubmit_.bind(this)
  }
  GetCountryList() {
    axios.get(`https://api.mercadolibre.com/sites/`)
      .then(res => {
        const countries = res.data;
        this.setState({ countries });
    })
  }
  componentDidMount(){
    this.GetCountryList();
  }

  handleChange_(event) {
    this.setState({
      countryChange: event.target.value
    });
  }
  handleSubmit_(event){
    event.preventDefault()
    this.setState( state => ({
      selectedCountry: state.countryChange
    }));
  }
  render(){
    const countries = this.state.countries;
		console.log(countries)
    const listitems = countries.map((country) => <option key={country.id+1} value={country.id}>{country.name}</option>);
    const { selectedCountry } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit_}>
          <select className="select-selected" defaultValue={'default'} onChange={this.handleChange_}>
            <option value="default" disabled defaultValue>Seleccioná tu país</option>
            {listitems}
          </select>
          <input type="submit" value="Cambiar" />
        </form>
        {
          selectedCountry &&
					<div>
            <br/>
						<Search site_id={selectedCountry}/>
						<h3>Categorías:</h3>
            <GetCategories site_id={selectedCountry} />
					</div>
        }
      </div>
    );
  }
}
