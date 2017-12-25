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

  loadSurvey(id, callback) {
    setTimeout(() => {
      if (id === '1') {
        callback(null, {
          title: 'Різні типи питань',
          date: '2017-12-21T18:48:55.251Z',
          questions: [
            {
              type: 'single',
              question:
                'У якому столітті відбулася Велика французька революція?',
              options: ['XVII', 'XVIII', 'XIX'],
              answer: null,
            },
            {
              type: 'multiple',
              question: 'Оберіть з наведених множин чисел та їх розширень поля',
              options: [
                'дійсні числа',
                'комплексні числа',
                'кватерніони',
              ],
              answer: null,
            },
            {
              type: 'number',
              question: 'Скільки у маршрутки ніг?',
              min: 0,
              max: 10,
              answer: null,
            },
            {
              type: 'string',
              question: 'Якого кольору методичка?',
              answer: null,
            },
            {
              type: 'text',
              question: 'Напишіть есе на тему ' +
                '«Екзистенційний страх чи страх екзистенції?»',
              answer: null,
            },
          ],
        });
      } else if (id === '2') {
        callback(null, {
          title: 'Інше опитування',
          date: '2017-12-20T12:00:55.251Z',
          questions: [
            {
              type: 'single',
              question:
                'У якому столітті відбулася Велика французька революція?',
              options: ['XVII', 'XVIII', 'XIX'],
              answer: 1,
            },
            {
              type: 'multiple',
              question: 'Оберіть з наведених множин чисел та їх розширень поля',
              options: [
                'дійсні числа',
                'комплексні числа',
                'кватерніони',
              ],
              answer: [0, 1],
            },
            {
              type: 'number',
              question: 'Скільки у маршрутки ніг?',
              min: 0,
              max: 10,
              answer: 4,
            },
            {
              type: 'string',
              question: 'Якого кольору методичка?',
              answer: 'прозорого, як вода',
            },
            {
              type: 'text',
              question: 'Напишіть есе на тему ' +
                '«Екзистенційний страх чи страх екзистенції?»',
              answer: 'why not both?',
            },
          ],
        });
      } else {
        callback(new Error('Unknown survey'));
      }
    }, 250);
  },
};
