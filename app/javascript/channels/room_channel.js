import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {

  const room_element = document.querySelector('#room-id')
  const room_id = Number(room_element.getAttribute('data-room-id'));

  consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id}, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log('connected...' + room_id);
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      // Called when there's incoming data on the websocket for this channel
      console.log(data);
  
      const user_element = document.querySelector('#user-id')
      const user_id = Number(user_element.getAttribute('data-user-id'));
  
      let html;
      if( user_id === data.message.user_id ) {
        html = data.mine;
      } else {
        html = data.theirs;
      }
  
      const messageContainer = document.querySelector('#message')
      messageContainer.innerHTML = messageContainer.innerHTML + html
    }
  });
})


