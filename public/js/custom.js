$(function(){
  Stripe.setPublishableKey('pk_test_SB1B9FBdFbFtX36IEzszMFS4');
  $(document).on('click','#plus',function(e){
    e.preventDefault();
    var priceValue = parseFloat($('#priceValue').val());

    var quantity =parseInt($('#quantity').val());

    priceValue += parseFloat($('#priceHidden').val());

    quantity +=1;
    $("#quantity").val(quantity);

    $("#priceValue").val(priceValue.toFixed(2));

    $("#total").html(quantity);
  });
  $(document).on('click','#minus',function(e){
    e.preventDefault();
    var priceValue = parseFloat($('#priceValue').val());
    var quantity = parseInt($('#quantity').val());
    if(quantity ==1){
      priceValue += parseFloat($('#priceHidden').val());
      quantity =1;
    }else{
      priceValue += parseFloat($('#priceHidden').val());
      quantity -=1;
    }

    $("#quantity").val(quantity);
    $("#priceValue").val(priceValue.toFixed(2));
    $("#total").html(quantity);
  });
  function stripeResponseHandler(status, response) {
    // Grab the form:

    var $form = $('#payment-form');

    if (response.error) { // Problem!

      // Show the errors on the form:
      alert(response.error.message);
      $form.find('.payment-errors').text(response.error.message);
      $form.find('.submit').prop('disabled', false); // Re-enable submission

    } else { // Token was created!
  alert("n");
      // Get the token ID:
      var token = response.id;
      alert(token);
      console.log(token);
      console.log("f");

      // Insert the token ID into the form so it gets submitted to the server:
      $form.append($('<input type="hidden" name="stripeToken">').val(token));

      // Submit the form:
      $form.get(0).submit();
    }
  };
  var $form = $('#payment-form');
    $form.submit(function(event) {

      // Disable the submit button to prevent repeated clicks:
      $form.find('.submit').prop('disabled', true);

      // Request a token from Stripe:
      Stripe.card.createToken($form, stripeResponseHandler);

      // Prevent the form from being submitted:
      return false;
    });

});
