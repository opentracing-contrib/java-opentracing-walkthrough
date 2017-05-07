$(function() {
    var order = new Order();

    $(".donut-btn").click(function(e){
      order.addDonut($(e.target).data("flavor"));
      render(order);
    });

    $("#order-btn").click(function(e){
      orderDonuts(order);
    });
});

function orderDonuts(order){
  order.activate()
  render(order)
  console.log("order")
  $.ajax('/order', {
    data: JSON.stringify({
      donuts: order.items(),
    }),
    method: 'POST',
    success: function(order_status) {
      console.log(order_status)
      order.setStatus(JSON.parse(order_status))
      render(order)
      pollStatus(order)
    },
  });
}

function pollStatus(order){
  if(!order.isActive()){
    return
  }
  setTimeout(function(){
    console.log("status");
    $.ajax('/status', {
      data: JSON.stringify({
        order_id: order.orderID(),
      }),
      method: 'POST',
      success: function(order_status) {
        console.log(order_status);
        order.setStatus(JSON.parse(order_status));
        
        if(!order.isDelivered()) {
          render(order);
          pollStatus(order);
          return
        }

        order.complete();
        render(order);
      },
    });
  },1000);
}

function render(order){
  renderCart(order);
  renderStatus(order);
}

function renderCart(order){
  if(!order.isOpen()){
    $("#shopping-cart").css("display","none");
    return;
  }

  var $items = $("#shopping-cart-items").empty();
  $.each(order.items(),function(i,item){
    $('<div class="cart-item" />')
    .html(item.flavor+": "+item.quantity)
    .appendTo($items)
  })
  $("#shopping-cart").css("display","inline-block")
}

function renderStatus(order){
  if(!order.isActive()){
    $("#order-status").css("display","none");
    return;
  }
  if(order.isOrdering()){
    $("#order-loading").css("display","inline-block");
    return
  }

  $("#order-loading").css("display","none");
  var status = order.status()
  $("#wait-time").html("Wait time: "+status.estimated_delivery_time+" seconds");
  $("#status-update").html("Status: "+status.state);
  $("#order-status").css("display","inline-block");
}
