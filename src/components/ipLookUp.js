/*recuperar country desde acá. (no es una buena práctica)*/
// hago una pequeña api en nodejs para recuperar el país del cliente.


// estoy es lento y encima problablemente en un futuro pueda
// dejar de funcionar
function ipLookUp () {
  $.ajax('http://ip-api.com/json')
  .then(
      function success(response) {
          console.log('User\'s Location Data is ', response);
          console.log('User\'s Country', response.country);
      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
  );
}
ipLookUp()

