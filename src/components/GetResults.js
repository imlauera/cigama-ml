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
      border: '1px solid #eee',
      margin: '2px',
      padding: '5px',
      listStyleType: 'none',
      fontSize: 12
    };
    const productos = this.state.productos
    console.log(productos)
		const listitems = productos.map( (item) =>  
			<li key={item.id+1} style={liStyle} >
        <img alt="thumbnail" src={item.thumbnail}/><br/>
        {item.title}
        <p>price: ${item.price}. Moneda: {item.currency_id}</p>
        <p>stock: {item.available_quantity}</p>
        <p><b>Información del vendedor: </b></p>
        <p>status: {item.seller.power_seller_status}</p>
        {/*<p>Página: <a href={item.seller.permalink}>{item.eshop.nick_name}</a></p>*/}
        <p>Acepta MercadoPago: {item.accepts_mercadopago}</p>
        {/*<p>{item.installments.quantity} cuotas de {item.installments.amount}</p>*/}
        <p>Envio gratis: {item.shipping.free_shipping === true ? <b>si</b> : <b>no</b>}</p>
        <p><a href={item.permalink}>Ver</a></p>

      </li>
		);  
    return (
      <ul>
				{listitems}
      </ul>
    );
  }
}
