class PairClient {
  constructor() {
    this.conn_id = null;
    // Create a websocket connection to the server.
    this.socket = new WebSocket('ws://0.0.0.0:8080');
    this.socket.onmessage = this.onMessage_.bind(this);
    this.socket.onerror = this.onError_.bind(this);

    // All callbacks.
    this.callbacks = {};
  }

  start(token) {
    const msg = JSON.stringify({type: 'start', token: token});
    this.socket.send(msg);
  }

  confirm(token) {
    const msg = JSON.stringify({type: 'confirm', token: token});
    this.socket.send(msg);
  }

  send(message) {
    if (this.conn_id === null) {
      console.error('No connection ID.');
      return;
    }
    const msg = JSON.stringify(
        {type: 'message', conn_id: this.conn_id, message: message});
    this.socket.send(msg);
  }

  on(event, callback) {
    if (event === 'ready') {
      this.socket.onopen = callback;
    }
    if (event === 'message') {
      this.callbacks.message = callback;
    }
    if (event === 'connected') {
      this.callbacks.connected = callback;
    }
    if (event === 'disconnected') {
      this.callbacks.disconnected = callback;
    }
    if (event === 'pair-confirm') {
      this.callbacks.pairConfirm = callback;
    }
  }

  /***** Private *******/
  onMessage_(e) {
    let json;
    try {
      json = JSON.parse(e.data);
    } catch (err) {
      console.error('Message must be in JSON format.', err, e.data);
      return;
    }
    if (json.type === 'connected') {
      this.conn_id = json.conn_id;
      console.log('Connection #' + this.conn_id + ' opened.');
      this.fire_(this.callbacks.connected);
    }
    if (json.type === 'message') {
      console.log('Received: ' + json.message);
      this.fire_(this.callbacks.message, json.message);
    }
    if (json.type === 'disconnected') {
      this.conn_id = null;
      this.fire_(this.callbacks.disconnected);
    }
    if (json.type === 'pair-confirm') {
      this.fire_(this.callbacks.pairConfirm);
    }
    if (json.info) {
      console.log('Info: ' + json.info);
      // TODO(smus): Get rid of this bit and replace it with pair-confirm event
      // from server.
      if (json.info === 'Got a pair request.') {
        this.fire_(this.callbacks.pairConfirm);
      }
    }
    if (json.error) {
      console.error('Error: ' + json.error);
    }
  }

  fire_(callback, arg) {
    if (callback) {
      callback(arg);
    }
  }

  onError_(err) {
    console.error(err);
    this.isServerError = true;
  }
}

export default PairClient;
