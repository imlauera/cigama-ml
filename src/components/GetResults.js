import React from 'react';
import axios from 'axios';

/*TODO: Implementar de una forma más eficiente el loadMore*/

export default class GetResults extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      productos: [],
      isLoading: true,
      indexComienzo: 0,
      itemsCargar: 5
    });
    this.GetSearchResultsList = this.GetSearchResultsList.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }
  GetSearchResultsList() {
    const stringSearch = this.props.stringSearch
    const site_id = this.props.site_id
    const itemsCargar = this.state.itemsCargar
    const indexComienzo = this.state.indexComienzo
    axios.get(`https://api.mercadolibre.com/sites/${site_id}/search?q=${stringSearch}&offset=${indexComienzo}&limit=${itemsCargar}`)
      .then(res => {
        if (this.unmounted) return ;
        const productos = res.data.results;
        this.setState({
          productos,
          isLoading: false 
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount(){
    this.GetSearchResultsList()
  }
  componentWillUnmount(){
    this.unmounted = true;
  }
  loadMore(){
    this.setState( (state) => ({
      itemsCargar: state.itemsCargar+5,
    }), () => {
      this.GetSearchResultsList();
    });
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
            <center><p style={acolor}><a href={item.permalink}>Ver</a></p></center>
       </li>
		);  
    return (
      <div>
        {
          this.state.isLoading
          ? <p>Cargando ...</p>
          :
          <div>
            <ul>
              {listitems}
              {listitems.length !== 0 && <center><button onClick={this.loadMore}>Cargar Más</button></center>}
            </ul>
          </div>
        }
      </div>
    );
  }
}
