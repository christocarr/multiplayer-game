const chatLog = (chatText) => {
  console.log(chatText);
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

  sock.emit('message', chatText);
};

const getBoard = (canvas, numCells = 3) => {
  const ctx = canvas.getContext('2d');
  ctx.strokeRect(0, 0, 400, 400);
  const cellSize = Math.floor(canvas.width / numCells);

  const drawGrid = () => {
    ctx.beginPath();
    for (let i = 0; i < numCells; i++) {
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, cellSize * numCells);
    }

    for (let i = 0; i < numCells; i++) {
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(cellSize * numCells, i * cellSize);
    }

    ctx.stroke();
  };

  const fillCell = (x, y) => {
    ctx.fillRect(x - (cellSize / 2), y - (cellSize / 2), cellSize, cellSize)
  }

  return { fillCell, drawGrid };
};

const getClickCoords = (element, ev) => {
  const { top, left } = element.getBoundingClientRect();
  const { clientX, clientY } = ev;

  return {
    x: clientX - left,
    y: clientY - top,
  };
};

(() => {
  const canvas = document.querySelector('canvas');
  const { fillCell, drawGrid } = getBoard(canvas);

  drawGrid();

  const sock = io();

  const onClick = (ev) => {
    const { x, y } = getClickCoords(canvas, ev);
    fillCell(x, y)
  };

  sock.on('message', chatLog);

  const chatForm = document.querySelector('.chat-form');
  chatForm.addEventListener('submit', onChatSubmitted(sock));

  canvas.addEventListener('click', onClick);
})();
