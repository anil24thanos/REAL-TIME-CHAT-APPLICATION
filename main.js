// client/main.js
const { createApp } = Vue;

createApp({
  data() {
    return {
      socket: null,
      input: '',
      messages: [],
      sender: 'User' + Math.floor(Math.random() * 1000),
    };
  },
  methods: {
    sendMessage() {
      if (this.input.trim() !== '') {
        const msg = { sender: this.sender, text: this.input };
        this.socket.send(JSON.stringify(msg));
        this.input = '';
      }
    }
  },
  mounted() {
    this.socket = new WebSocket("ws://localhost:3000");

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      this.messages.push({ ...msg, id: Date.now() + Math.random() });
    };
  }
}).mount('#app');
