import React from 'react';
import axios from 'axios';

export default class GetResults extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      productos: []
    });
    this.GetSearchResultsList = this.GetSearchResultsList.bind(this)
  }
  GetSearchResultsList() {
    const stringSearch = this.props.stringSearch
    const site_id = this.props.site_id
    console.log(`este es el sitio ${site_id}`)
    axios.get(`https://api.mercadolibre.com/sites/${site_id}/search?q=${stringSearch}&limit=20`)
      .then(res => {
        const productos = res.data.results;
        this.setState({ productos });
      })
  }
  componentDidMount(){
    document.addEventListener("keyup",this.GetSearchResultsList)
  }
  componentWillUnmount(){
    document.removeEventListener("keyup",this.GetSearchResultsList)
  }
  render(){
    let liStyle = {
      border: '1px solid black',
      margin: '3px'
    };
    const productos = this.state.productos
		const listitems = productos.map( (item) =>  
			<li key={item.id+1}><p>${item.price}</p><img alt="thumbnail" src={item.thumbnail}/>{item.title}</li>
		);  
    return (
      <ul>
				{listitems}
      </ul>
    );
  }
}
