import React from 'react';
import axios from 'axios';

export default class GetProducts extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      productos: []
    };
  }
  componentDidMount(){
    console.log('cuantas veces');
    this.GetList();
  }
  GetList() {
    const site_id = this.props.site_id
    const category_id = this.props.category_id
    console.log(site_id)
    axios.get(`https://api.mercadolibre.com/sites/${site_id}/search?category=${category_id}&limit=5`)
      .then(res => {
        const productos = res.data.results;
        this.setState({ productos });
    });
  }
  render(){
    let liStyle = { 
      border: '1px solid black',
      margin: 10
    };  
    const productos = this.state.productos
    console.log(productos)
    const listitems = productos.map( (item) => 
      <li style={liStyle} key={item.id+1}><p>${item.price}</p><img alt="thumbnail" src={item.thumbnail}/>{item.title}</li>
    );
    return(
      <ul>
        {listitems}
      </ul>
    );
  }
}
