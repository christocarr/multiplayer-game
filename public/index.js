const chatLog = (chatText) => {
  const chatBox = document.querySelector('.chat-log');
  const chatLine = document.createElement('li');
  chatLine.textContent = chatText;
  chatBox.appendChild(chatLine);
  chatBox.scrollTop = chatBox.scrollHeight;
};

const onChatSubmitted = (ev) => {
  ev.preventDefault();
  const chatTextInput = document.querySelector('.chat-text');
  const chatText = chatTextInput.value;
  chatTextInput.value = '';
  chatLog(chatText);
};

(() => {
  chatLog('Welcome');
  const chatForm = document.querySelector('.chat-form');
  chatForm.addEventListener('submit', onChatSubmitted);
})();
