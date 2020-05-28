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
    this._asyncRequest = 
    axios.get(`https://api.mercadolibre.com/sites/${site_id}/search?category=${category_id}&limit=3`)
      .then(res => {
        const productos = res.data.results;
        this.setState({ productos });
    });
  }
  componentWillUnmount(){
    if (this._asyncRequest){
      this.asyncRequest.cancel();
    }

  }
  render(){
    let liStyle = { 
      margin: 10,
      fontSize: 12
    };  
    const productos = this.state.productos
    console.log(productos)
    const listitems = productos.map( (item) => 
      <li style={liStyle} key={item.id+1}>
        <div className="card">
          <div className="text">
            {item.price} {item.title}
          </div>
        <img alt="thumbnail" src={item.thumbnail}/></div>
      </li>
    );
    return(
      <ul className="projects-grid">
        {listitems}
      </ul>
    );
  }
}
