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
      marginTop: '5px',
      border: '1px solid #999',
      padding: '5px',
      listStyleType: 'none',
      fontSize: 16,
      backgroundColor: '#f9f9f9'
    };
    let acolor = {
      backgroundColor: '#e9e9e9',
      color: 'white'
    };
    const productos = this.state.productos
    console.log(productos)
		const listitems = productos.map( (item) =>  
			<li key={item.id+1} style={liStyle} >
        <img alt="thumbnail" src={item.thumbnail}/>
        {item.title}
        <p>precio: ${item.price}. Moneda: {item.currency_id}</p>
        <p>stock: {item.available_quantity}</p>
        <p><b>Información del vendedor: </b></p>
        <p>status: {item.seller.power_seller_status === null ? <b>No hay información</b> : <b>{item.seller.power_seller_status}</b> }</p>
        <p>Acepta MercadoPago: {item.accepts_mercadopago === true ? <b>si</b> : <b style={{color: 'red'}}>no</b>}</p>
        {/*<p>{item.installments.quantity} cuotas de {item.installments.amount}</p>*/}
        <p>Envio gratis: {item.shipping.free_shipping === true ? <b>si</b> : <b style={{color: 'red'}}>no</b>}</p>
        <center><p style={acolor}><a href={item.permalink} target="_blank">Ver</a></p></center>

      </li>
		);  
    return (
      <ul>
				{listitems}
      </ul>
    );
  }
}
