const Route = use('Router');

/**
 * List of routes
 */
// Route.get('/', 'HomeController@home');
// Route.get('/test', parameter => 'poop');
// Route.get('/test/:id', (parameter) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(parameter)
//         }, 1000);
//     })
// });

/**
 * Alternative routes by Raiondesu
 */

const routes = (route) => ({
  '/': route('GET', 'StaticController@render'),
  'static/:type/:file': route('GET', 'StaticController@render'),
  'api': {
    'user': {
      'register': route('POST', 'UserController@register', { middleware: ['check-db', 'body-parser'] }),
      'login': route('POST', 'UserController@login', { middleware: ['check-db', 'body-parser'] }),
      'logout': route('GET', 'UserController@logout', { middleware: ['check-db', 'auth'] }),
      ':username': {
        '/': route('GET', 'UserController@index', { middleware: ['check-db'] })
      }
    },
    'book': {
      'add': route('POST', 'BookController@add', { middleware: ['check-db', 'check-token'] }),
      'add-custom': route('POST', 'BookController@addCustom', { middleware: ['check-db', 'check-token'] }),
      'list': route('GET', 'BookController@list', { middleware: ['check-db'] }),
      'claim': route('POST', 'BookController@claim', { middleware: ['check-db', 'check-token'] }),
    }
  }
})

Route.registerRoutes(routes)
