import React from 'react';
import axios from 'axios';
import GetCategories from './GetCategories';
import GetProducts from './GetProducts';
import Search from './Search';

export default class GetCountries extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      countries: [],
      countryChange: '',
      selectedCountry: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleChange(event) {
    this.setState({
      countryChange: event.target.value
    });
  }
  handleSubmit(event){
    event.preventDefault()
    this.setState( state => ({
      selectedCountry: state.countryChange
    }));
  }
  render(){
    const countries = this.state.countries;
		// console.log(countries)
    const listitems = countries.map((country) => <option key={country.id+1} value={country.id}>{country.name}</option>);
    const { selectedCountry } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select defaultValue={'default'} onChange={this.handleChange}>
            <option value="default" disabled defaultValue>Seleccioná tu país</option>
            {listitems}
          </select>
          <input type="submit" value="Cambiar"/>
        </form>
        <p>{this.state.selectedCountry}</p>
        {
          selectedCountry &&
					<div>
						<Search site_id={selectedCountry}/>
						<h3>Categorías:</h3>
						<GetCategories site_id={selectedCountry} />
						<GetProducts  site_id={selectedCountry} />
					</div>
        }
      </div>
    );
  }
}
