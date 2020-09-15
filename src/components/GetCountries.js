import React from 'react';
import axios from 'axios';
import GetCategories from './GetCategories';
import Search from './Search';
import './GetCountries.css'

/* Material UI */
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


export default class GetCountries extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      countries: [],
      countryChange: '',
      selectedCountry: ''
    };
    this.handleChange_ = this.handleChange_.bind(this)
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
  render(){
    const countries = this.state.countries;
		console.log(countries)
    const listitems = countries.map((country) => <option key={country.id+1} value={country.id}>{country.name}</option>);
    const selectedCountry = this.state.countryChange;
    return (
      <div>
      <FormControl>
				<InputLabel id="demo-controlled-open-select-label">Seleccioná tu país</InputLabel>
        <NativeSelect 
					style={{fontSize: 30}} onChange={this.handleChange_}>
          <option aria-label="None" value="" />
					{listitems}
        </NativeSelect>
      </FormControl>
        {/*<form>
          <select className="select-selected" defaultValue={'default'} onChange={this.handleChange_}>
            <option value="default" disabled defaultValue>Seleccioná tu país</option>
            {listitems}
          </select>
        </form>
				*/}
        {
          selectedCountry &&
					<div>
            <p>Ahora estás buscando en <b>{selectedCountry}</b></p>
            <br/>
            <p className="logo">Cigama</p>
            <Search site_id={selectedCountry}/>
						<h3>Categorías:</h3>
            <GetCategories site_id={selectedCountry} />
					</div>
        }
      </div>
    );
  }
}
