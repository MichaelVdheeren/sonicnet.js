import { SonicSocket, SonicServer } from '../../lib/src/index';
import PairClient from './pair-client.js';

const ALPHABET = '0123456789';
const TOKEN_LENGTH = 5;

// Create an ultranet server.
const sonicServer = new SonicServer({alphabet: ALPHABET, debug: true});
// Create an ultranet socket.
const sonicSocket = new SonicSocket({alphabet: ALPHABET});
// Create a connection to the pairing server.
const pairClient = new PairClient();

let token;

// UI Parts
const changeNameButton = document.querySelector('#change-name');
const connectButton = document.querySelector('#connect');
const chatForm = document.querySelector('#say');
const chatBox = chatForm.querySelector('input');
const userName = localStorage.userName || null;
const history = document.querySelector('#history');
const wrap = document.querySelector('#history-wrap');

function init() {
  // Start the pairing thing.
  initPair();
}

function initPair() {
  // Generate a random pairing token.
  token = generateToken();

  if (pairClient.isServerError) {
    onServerError();
  }
  // Setup a connection to the pairing server when it's ready.
  pairClient.on('ready', function() {
    pairClient.start(token);
  });
  // Listen for messages from other clients.
  pairClient.on('message', onIncomingChat);
  pairClient.on('connected', onConnected);
  pairClient.on('disconnected', onDisconnected);
  pairClient.on('pair-confirm', onPairReady);

  // Start an ultranet server.
  sonicServer.start();
  // Start listening for messages on the sonic server.
  sonicServer.on('message', onToken);
}

function initUI() {
  connectButton.addEventListener('click', startChatHandler);
  chatForm.addEventListener('submit', submitHandler);
  changeNameButton.addEventListener('click', changeNameHandler);

  function startChatHandler() {
    // Send the pairing token to nearby ultranet clients.
    sonicSocket.send(token);
  }

  function changeNameHandler() {
    const oldName = getUserName();
    const newName = prompt('New user name (was ' + oldName + ')');
    if (newName) {
      localStorage.userName = newName;
    }
  }

  function submitHandler(e) {
    // Broadcast the message out to the other client (if one exists).
    const authorMessage = getAuthorMessage(getUserName(), chatBox.value)
    // Send through socket.
    pairClient.send(authorMessage);
    // Clear form.
    chatBox.value = '';
    // Update the chat box.
    addChatLine(authorMessage);
    // Prevent the page from reloading.
    e.preventDefault();
  }

}

function generateToken() {
  let newToken = '';
  let count = 0;
  let char;
  let lastChar;
  while (count < TOKEN_LENGTH) {
    console.log(count, TOKEN_LENGTH);
    // Generate a random value from the alphabet.
    const index = Math.floor(Math.random() * ALPHABET.length);
    char = ALPHABET[index];
    if (char !== lastChar) {
      count += 1;
      newToken += char;
      lastChar = char;
      console.log(lastChar, char);
    }
  }
  return newToken;
}

function onToken(otherToken) {
  console.log('Got token', otherToken, token);
  // Don't connect to yourself!
  //if (token !== otherToken) {
    // Attempt to confirm the connection with the pair server.
    pairClient.confirm(otherToken);
  //}
}

function onIncomingChat(text) {
  addChatLine(text);
}

function onPairReady() {
  // Change the text to be "Connect!".
  connectButton.querySelector('span').innerHTML = 'Connect!';
  // Change the button styling to be enabled.
  connectButton.classList.remove('disabled');
  // Configure UI.
  initUI();
}

function onConnected() {
  // Hide the overlay.
  document.querySelector('#overlay').style.display = 'none';
  // Place cursor inside input box.
  chatBox.focus();
}

function onDisconnected() {
  // Show the overlay.
  document.querySelector('#overlay').style.display = 'block';
}

function onServerError() {
  // Update the error dialog.
  connectButton.querySelector('span').innerHTML = 'Server error!';
}

function getAuthorMessage(author, message) {
  return author + ': ' + message;
}

function addChatLine(text) {
  const formattedText = getTime() + ' ' + text;
  history.innerHTML += formattedText + '<br/>';

  // Scroll history to the bottom.
  wrap.scrollTop = history.scrollHeight;
}

function getTime() {
  let now = new Date();
  let hours = now.getHours();
  hours = (hours > 9 ? hours: ' ' + hours);
  let mins = now.getMinutes();
  mins = (mins > 9 ? mins : '0' + mins);
  let secs = now.getSeconds();
  secs = (secs > 9 ? secs : '0' + secs);
  return '[' + hours + ':' + mins + ':' + secs + ']';
}

function getUserName() {
  return (localStorage.userName === undefined ?
          'Anonymous' : localStorage.userName);
}

window.addEventListener('load', init);
