var pkg = require('./package.json'),
  chalk = require('chalk'),
  output = chalk.gray,
  title = chalk.bold.blue,
  command = chalk.green,
  string = chalk.cyan,
  options = chalk.red,
  repeat = require('underscore.string/repeat');

module.exports = [
    '',
    title(pkg.name),
    title(repeat('=', pkg.name.length)),
    '',
    pkg.description,
    '',
    'Usage',
    '-----',
    ['$ string', command('<command>'), string('<string>'), options('[-- options]')].join(' '),
    '',
    ['$ string', command('camelize'), string('hello world')].join(' '),
    output('# js => s.camelize("hello world");'),
    output('# => helloWorld'),
    '',
    ['$ string', command('camelize'), string('-hello-world'), options('-- true')].join(' '),
    output('# js => s.camelize("-hello-world", true);'),
    output('# => helloWorld'),
    '',
    ['$ string', command('join'), string('\\|'), options('-- foo bar moo boo')].join(' '),
    output('# js => s.join("|", "foo", "bar", "moo", "boo");'),
    output('# => foo|bar|moo|boo'),
    '',
    ['$ string', command('levenshtein'), string('kitten'), options('-- kittah')].join(' '),
    output('# js => s.levenshtein("kitten", "kittah");'),
    output('# => 2'),
    '',
    ['$ echo', string('"foo    bar"'), '| string', command('clean'), '| string', command('capitalize')].join(' '),
    output('# js => s("foo    bar").clean().capitalize().value()'),
    output('# => Foo bar'),
    ''
  ];