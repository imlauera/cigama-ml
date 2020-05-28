/*
Para hacer el search tenés que hacer un controlled input
que te pida por lo menos 3 letras para hacer la consulta a la api
cada vez que escribe una letra hace una consulta a la api.
*/
import React from 'react';
import GetResults from './GetResults';

export default class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  render(){
    let h3Style = {
      border: '1px solid black'
    };
    if (this.state.input.length < 3)
      h3Style.border = "1px solid red"

    const style = {width: "21px"}
    return (
      <div>
        <input placeholder="search" onChange={this.handleChange} style={{style}} />
        {
          this.state.input.length > 1 && 
            <div>
            <h3 style={h3Style}>searching: {this.state.input}</h3>
            <GetResults site_id={this.props.site_id} stringSearch={this.state.input} />
            </div>
        }
      </div>
    );
  }
}
