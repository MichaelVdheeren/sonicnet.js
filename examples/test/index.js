import { SonicSocket, SonicServer } from '../../lib/src/index';

const ALPHABET = '0123456789';
const MESSAGE = '314159';

const button = document.querySelector('#message');
button.addEventListener('click', onButton);

function onButton() {
  const ssocket = new SonicSocket({alphabet: ALPHABET, charDuration: 0.2});
  ssocket.send(MESSAGE);
}

// On some other machine:
const sserver = new SonicServer({alphabet: ALPHABET});
sserver.on('message', function(message) {
  // message is '31415'. Do something with it.
  console.log(message);
});
sserver.start();
