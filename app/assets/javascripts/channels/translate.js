App.translate = App.cable.subscriptions.create("TranslateChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    // Called when there's incoming data on the websocket for this channel

    if (stack.length < $('#user_input').val().length) {
      stack.push(data.message);
    } else {
      stack.pop();
    }

    var diff = stack.length - $('#user_input').val().length;
    if(diff > 0) {
      for(var i = 0; i < diff; i++) {
        stack.pop();
      }
    }

    // console.log(stack);

    $('#translation').html(stack.join(''));
  },

  respond: function(msg) {
    return this.perform('respond', { message: msg });
  }
});

$( document ).ready(function() {

  $('#user_input').on('input', function() {
    
    // console.log( $('#user_input').val() );
    str = $('#user_input').val();
    
    App.translate.respond(
      str.charAt(str.length - 1)
    );

  });

});

var stack = [];
