import React from 'react';
import axios from 'axios';

export default class GetCategories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categorias: []
    };
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
      <div>
      <li style={liStyle} key={item.id+1}>{item.name} {item.id}</li>
      </div>
    );
    return(
      <ul>
        {items}
      </ul>
    );
  }
}
