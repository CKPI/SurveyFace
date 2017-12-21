export default {
  signIn(username, password, callback) {
    setTimeout(() => {
      if (username === 'ip1898' && password === 'survey') {
        callback(null, { name: 'Згуровський Михайло' });
      } else {
        callback(new Error('Authentication failed'));
      }
    }, 200);
  },
};
