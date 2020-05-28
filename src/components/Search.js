/*
Entre search y getresults generan un bucle infinito.

Para hacer el search tenés que hacer un controlled input
que te pida por lo menos 3 letras para hacer la consulta a la api
cada vez que escribe una letra hace una consulta a la api.
*/
import React from 'react';
import GetResults from './GetResults';
import './Search.css';

export default class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange__ = this.handleChange__.bind(this)
  }
  handleChange__(event) {
    this.setState({
      input: event.target.value
    });
  }
  render(){
    let h3Style = {
      border: 'none'
    };
    if (this.state.input.length < 3)
      h3Style.border = "1px solid red"

    return (
      <div>
        <input type="text" className="search" placeholder="search" onChange={this.handleChange__} />
        <br/>
        { this.state.input.length > 2 &&
        <GetResults site_id={this.props.site_id} stringSearch={this.state.input}/>
        }
      </div>
    );
  }
}
