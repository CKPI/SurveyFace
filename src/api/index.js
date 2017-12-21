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

  loadSurveysList(callback) {
    setTimeout(() => {
      callback(null, [
        {
          id: 1,
          title: 'Різні типи питань',
          date: '2017-12-21T18:48:55.251Z',
        },
        {
          id: 2,
          title: 'Інше опитування',
          date: '2017-12-20T12:00:55.251Z',
        },
      ]);
    }, 300);
  },
};
