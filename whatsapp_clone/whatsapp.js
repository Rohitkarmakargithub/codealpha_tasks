//websocket
const socket = new WebSocket('ws://localhost:3030');

socket.addEventListener('open', (event) => {
  console.log('Connected to the WebSocket server');
});

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  console.log('Received message:', message);
});

function sendMessage(message) {
  socket.send(JSON.stringify({ type: 'message', content: message }));
}

document.addEventListener('DOMContentLoaded', function () {
  const messageInput = document.querySelector('#chat');
  const sendMessageButton = document.querySelector('.chatinput ion-icon[name="send-outline"]');

  sendMessageButton.addEventListener('click', function () {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Append sent message to the chatbox
      const chatbox = document.querySelector('.chatbox');
      const newMessage = `
        <div class="message my_message">
          <p>${messageText}<br><span>${currentTime}</span></p>
        </div>
      `;
      chatbox.innerHTML += newMessage;

      // Update the chat block in the left side
      const activeBlock = document.querySelector('.block.active');
      if (activeBlock) {
        activeBlock.querySelector('.message_p p').innerText = messageText;
        activeBlock.querySelector('.time').innerText = currentTime;
      }

      // Send the message to the server
      sendMessage(messageText);

      // Clear the input field
      messageInput.value = '';
    }
  });
});
//when i click the blocks
document.addEventListener('DOMContentLoaded', function () {
  const chatBlocks = document.querySelectorAll('.block');

  chatBlocks.forEach(block => {
    block.addEventListener('click', function () {
      chatBlocks.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const selectedChatName = this.querySelector('.listhead h4').innerText;
      const selectedChatTime = this.querySelector('.time').innerText;
      const selectedChatMessage = this.querySelector('.message_p p').innerText;

      const rightHeader = document.querySelector('.right .header h4');
      rightHeader.innerHTML = `${selectedChatName}`;

      const chatbox = document.querySelector('.chatbox');
      const isUnread = this.classList.contains('unread');
      const messageClass = isUnread ? 'frd_message' : 'my_message';

      chatbox.innerHTML = `
        <div class="message ${messageClass}">
          <p>${selectedChatMessage}<br><span>${selectedChatTime}</span></p>
        </div>
      `;
    });
  });
});


//expansion of the image
document.addEventListener('DOMContentLoaded', function () {
  const coverImages = document.querySelectorAll('.cover1');

  coverImages.forEach(coverImage => {
    coverImage.addEventListener('click', function () {
      const expandedImage = document.getElementById('expandedImage');
      expandedImage.src = this.src;
      const modal = document.getElementById('imageModal');
      modal.style.display = 'block';

      const closeBtn = document.querySelector('.close');
      closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
      });
    });
  });
});

//search chats on search bar
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const chatList = document.querySelector('.chatlist');

  searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    const blocks = chatList.querySelectorAll('.block');

    blocks.forEach(block => {
      const details = block.querySelector('.details');
      const chatName = details.querySelector('h4').innerText.toLowerCase();

      if (chatName.includes(searchTerm)) {
        block.style.display = 'flex';
      } else {
        block.style.display = 'none';
      }
    });

    const noResultsMessage = document.getElementById('noResultsMessage');

    if (chatList.querySelectorAll('.block[style*="display: flex;"]').length === 0) {
      if (!noResultsMessage) {
        const messageElement = document.createElement('div');
        messageElement.id = 'noResultsMessage';
        messageElement.innerText = 'No chats found';
        chatList.appendChild(messageElement);
      }
    } else {
      if (noResultsMessage) {
        noResultsMessage.remove();
      }
    }
  });
});

//new group 
document.addEventListener('DOMContentLoaded', function () {
  const newGroupSection = document.querySelector('.new-group-section');
  const addGroupButton = document.querySelector('.nav_bar ion-icon[name="add-circle-outline"]');
  const searchContainer = document.querySelector('.search_container');
  const chatList = document.querySelector('.chatlist');

  addGroupButton.addEventListener('click', function () {
    newGroupSection.classList.toggle('active');
    searchContainer.classList.toggle('active');
    chatList.classList.toggle('active');
  });

  const closeButton = document.querySelector('.close-button');

  closeButton.addEventListener('click', function () {
    newGroupSection.classList.remove('active');
    searchContainer.classList.remove('active');
    chatList.classList.remove('active');
  });
});

//add participants
document.addEventListener('DOMContentLoaded', function () {

  const addGroupButton = document.querySelector('.nav_bar ion-icon[name="add-circle-outline"]');
  const searchContainer = document.querySelector('.search_container');
  const chatList = document.querySelector('.chatlist');
  const participantsList = document.querySelector('.participants-list');
  const addParticipantsButton = document.createElement('button');
  addParticipantsButton.innerText = 'Add Participants';
  addParticipantsButton.addEventListener('click', function () {
    const selectedParticipants = participantsList.querySelectorAll('.participant-checkbox:checked');
    const selectedNames = Array.from(selectedParticipants).map(participant => {
      return participant.parentElement.innerText.trim();
    });
    console.log('Selected Participants:', selectedNames);
  });
  participantsList.appendChild(addParticipantsButton);
});

document.addEventListener('DOMContentLoaded', function () {
  const openStatusesButton = document.getElementById('openStatuses');

  openStatusesButton.addEventListener('click', function () {
    window.open('statuses.html', '_self');
  });

});

document.addEventListener('DOMContentLoaded', function () {
  const backButton = document.querySelector('.close-button ion-icon');

  backButton.addEventListener('click', function () {
    window.location.href = 'whatsapp.html';
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const happyOutlineIcon = document.querySelector('ion-icon[name="happy-outline"]');
  const chatInput = document.getElementById('chat');

  happyOutlineIcon.addEventListener('click', function() {
      const emojiPicker = document.createElement('div');
      emojiPicker.classList.add('emoji-picker');

      const emojis = ['😊', '😄', '😁', '😆', '😂', '😅', '🥰', '😍', '😎', '🤩','🤣','😎','😉','😍','😒','😘','😁','😎','😉','😢'];

      emojis.forEach(emoji => {
          const emojiButton = document.createElement('button');
          emojiButton.classList.add('emoji-button');
          emojiButton.innerText = emoji;

          emojiButton.addEventListener('click', function() {
              chatInput.value += emoji;
              emojiPicker.classList.remove('emoji-picker');
          });

          emojiPicker.appendChild(emojiButton);
      });

      document.body.appendChild(emojiPicker);
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Get all the block elements
  const blocks = document.querySelectorAll('.block');

  // Add click event listener to each block
  blocks.forEach(block => {
      block.addEventListener('click', function() {
          // Remove the unread class and b element
          this.classList.remove('unread');
          const unreadCount = this.querySelector('.message_p b');
          if (unreadCount) {
              unreadCount.remove();
          }

          // Change the time color to default
          const time = this.querySelector('.time');
          time.classList.remove('unread');
      });
  });
});


