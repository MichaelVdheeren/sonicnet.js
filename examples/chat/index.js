import { SonicSocket, SonicServer } from '../../lib/src/index';

const ALPHABET = ' abcdefghijklmnopqrstuvwxyz';
// Create an ultranet server.
const sonicServer = new SonicServer({alphabet: ALPHABET, debug: true});
// Create an ultranet socket.
const sonicSocket = new SonicSocket({alphabet: ALPHABET});


const history = document.querySelector('#history');
const wrap = document.querySelector('#history-wrap');
const form = document.querySelector('form');
const input = document.querySelector('input');

function init() {
  sonicServer.start();
  sonicServer.on('message', onIncomingChat);
  form.addEventListener('submit', onSubmitForm);
}

function onSubmitForm(e) {
  // Get contents of input element.
  const message = input.value;
  // Send via oscillator.
  sonicSocket.send(message);
  // Clear the input element.
  input.value = '';
  // Don't actually submit the form.
  e.preventDefault();
}

function onIncomingChat(message) {
  console.log('chat inbound.', message);
  history.innerHTML += time() + ': ' + message + '<br/>';
  // Scroll history to the bottom.
  wrap.scrollTop = history.scrollHeight;
}

function time() {
  const now = new Date();
  let hours = now.getHours();
  hours = (hours > 9 ? hours: ' ' + hours);
  let mins = now.getMinutes();
  mins = (mins > 9 ? mins : '0' + mins);
  let secs = now.getSeconds();
  secs = (secs > 9 ? secs : '0' + secs);
  return '[' + hours + ':' + mins + ':' + secs + ']';
}

window.addEventListener('load', init);
