// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();

// Connect to the Feathers server using the Socket.io connection
client.configure(feathers.socketio(socket));

// Renders a message to the page
const addMessage = message => {
  // The user that sent this message (added by the populate-user hook)
  //   const { user = {} } = message;
  const atomsContainer = document.querySelector('.atoms');
  // Escape HTML to prevent XSS attacks
  const text = message.field1;
  // .replace(/&/g, '&amp;')
  // .replace(/</g, '&lt;')
  // .replace(/>/g, '&gt;');

  if (atomsContainer) {
    atomsContainer.innerHTML += `
        <p class="message flex flex-row">
          ${text}
      </p>`;

    // Always scroll to the bottom of our message list
    atomsContainer.scrollTop =
      atomsContainer.scrollHeight - atomsContainer.clientHeight;
  }
};

const addEventListener = (selector, event, handler) => {
  document.addEventListener(event, async ev => {
    if (ev.target.closest(selector)) {
      handler(ev);
    }
  });
};

// "Signup and login" button click handler
addEventListener('#create', 'click', async () => {
  // For signup, create a new user and then log them in
  const atom = {
    field1: 'test test test'
  };

  // First create the user
  await client.service('atoms').create(atom);
});

// Listen to created events and add the new message in real-time
client.service('atoms').on('created', addMessage);
