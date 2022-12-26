const sendPayload = (message, items, status) => ({
  message,
  items,
  status,
});

const messageCreator = (method, error, message) =>
  `[${method}] ${error ? "ERROR" : "OK"}: ${message}`;

module.exports = {
  sendPayload,
  messageCreator,
};
