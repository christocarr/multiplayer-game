const chatLog = (chatText) => {
  console.log(chatText)
  const chatBox = document.querySelector('.chat-log');
  const chatLine = document.createElement('li');
  chatLine.textContent = chatText;
  chatBox.appendChild(chatLine);
  chatBox.scrollTop = chatBox.scrollHeight;
};

const onChatSubmitted = (sock) => (ev) => {
  ev.preventDefault();
  const chatTextInput = document.querySelector('.chat-text');
  const chatText = chatTextInput.value;
  chatTextInput.value = '';
  
  sock.emit('message', chatText)
};

(() => {
  const sock = io();

  sock.on('message', chatLog);

  const chatForm = document.querySelector('.chat-form');
  chatForm.addEventListener('submit', onChatSubmitted(sock));
})();
