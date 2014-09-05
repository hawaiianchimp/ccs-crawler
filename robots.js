var robots = require('robots')
  , parser = new robots.RobotsParser();

parser.setUrl('http://nodeguide.ru/robots.txt', function(parser, success) {
  if(success) {
    parser.canFetch('*', '/doc/dailyjs-nodepad/', function (access) {
      if (access) {
        // parse url
      }
    });
  }
});