var stripe = Stripe("pk_test_OaTIZ4FrGiXeppCRV5Laqbo4");

var elements = stripe.elements();

var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

var card = elements.create('card', {style:style});

card.mount('#card-element');

//In charge of detecting and showing errors in view
card.addEventListener('change', function(event){
  var displayError = document.getElementById('card-errors');
  if(event.error){
    displayError.content= event.error.message;
  }
  else{
    displayError.content= '';
  }
});

var form = document.getElementById('stripe-form');

form.addEventListener('submit', function(event){
  event.preventDefault();

  //Enviar a server para generar token con el objeto card
  stripe.createToken(card).then(function(result){
    if(result.error){
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    }
    else{
      stripeTokenHandler(result.token); //'Recibir' token de Stripe
    }
  });
});

function stripeTokenHandler(token){
  var form = document.getElementById('stripe-form');

  //////////////////////////////////////////////////
  var amount = document.getElementById('amountPay');
  amount.setAttribute('name','amount');
  //////////////////////////////////////////////////


  //Creo div de tipo input
  var hiddenInput = document.createElement('input');

  //Le doy los valores al input
  hiddenInput.setAttribute('type','hidden');
  hiddenInput.setAttribute('name','stripeToken');
  hiddenInput.setAttribute('value', token.id);

  //Lo añado al HTML
  form.appendChild(hiddenInput);
  //Hacemos submit del form
  form.submit();
}
