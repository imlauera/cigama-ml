import React from 'react';
import axios from 'axios';

/*
Agregar un select de categorías si eligue una
mostrá 5 productos de esa categoría.
*/

export default class GetCategories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categorias: []
    };
  }
  componentDidUpdate(){
    this.GetList();
  }
  componentDidMount(){
    this.GetList();
  }
  GetList() {
    const site_id = this.props.site_id
    axios.get(`https://api.mercadolibre.com/sites/${site_id}/categories`)
      .then(res => {
        const categorias = res.data;
        this.setState({ categorias });
    });
  }
  render(){
    let liStyle = {
      listStyleType: 'none'
    };
    const categorias = this.state.categorias
    const items = categorias.map( (item) => 
      <li style={liStyle} key={item.name+1}>{item.name}</li>
    );
    return(
      <ul>
        {items}
      </ul>
    );
  }
}
