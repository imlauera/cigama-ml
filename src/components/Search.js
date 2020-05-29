import React from 'react';
import GetResults from './GetResults';
import './Search.css';

export default class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      submit: '',
      typing: false
    };
    this.handleChange__ = this.handleChange__.bind(this)
    this.handleSubmit__ = this.handleSubmit__.bind(this)
  }
  handleChange__(event) {
    this.setState({
      input: event.target.value,
      typing: true
    });
  }
  handleSubmit__(event){
    event.preventDefault()
    this.setState({
      submit: this.state.input,
      typing: false
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
        <form onSubmit={this.handleSubmit__}>
        <input type="text" className="search" placeholder="Buscar productos" onChange={this.handleChange__} />
        </form>
        <br/>
        { this.state.typing  
        ? <p>Escribiendo ...</p>
        : <GetResults site_id={this.props.site_id} stringSearch={this.state.submit}/>
        }
      </div>
    );
  }
}
