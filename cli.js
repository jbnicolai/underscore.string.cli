#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2), {
  stopEarly: true,
  '--': true
}),
  pkg = require('./package.json'),
  string = require('./index'),
  chalk = require('chalk'),
  repeat = require('underscore.string/repeat');

if (argv.help || argv._.length <= 0) {
  console.log([
    '',
    chalk.bold.blue(pkg.name),
    chalk.bold.blue(repeat('=', pkg.name.length)),
    '',
    pkg.description,
    '',
    'Usage',
    '-----',
    ['$ string', chalk.green('<command>'), chalk.cyan('<string>'), chalk.magenta('[-- options]')].join(' '),
    '',
    ['$ string', chalk.green('camelize'), chalk.cyan('hello world')].join(' '),
    chalk.gray('# js => s.camelize("hello world");'),
    chalk.gray('# => helloWorld'),
    '',
    ['$ string', chalk.green('camelize'), chalk.cyan('-hello-world'), chalk.magenta('-- true')].join(' '),
    chalk.gray('# js => s.camelize("-hello-world", true);'),
    chalk.gray('# => helloWorld'),
    '',
    ['$ string', chalk.green('join'), chalk.cyan('\\|'), chalk.magenta('-- foo bar moo boo')].join(' '),
    chalk.gray('# js => s.join("|", "foo", "bar", "moo", "boo");'),
    chalk.gray('# => foo|bar|moo|boo'),
    '',
    ['$ string', chalk.green('levenshtein'), chalk.cyan('kitten'), chalk.magenta('-- kittah')].join(' '),
    chalk.gray('# js => s.levenshtein("kitten", "kittah");'),
    chalk.gray('# => 2'),
    '',
    ['$ echo', chalk.cyan('"foo    bar"'), '| string', chalk.green('clean'), '| string', chalk.green('capitalize')].join(' '),
    chalk.gray('# js => s("foo    bar").clean().capitalize().value()'),
    chalk.gray('# => Foo bar'),
    ''
  ].join('\n'));
} else {
  var str = string.str(argv._);
  var command = string.command(argv._);
  var args = string.args(argv['--']);


  if (!string.has(command)) {
    console.error(chalk.red('Unknown command:', command));
    process.exit(1);
  }

  if (!str.length && str.length <= 0) {
    var readline = require('readline');

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    rl.on('line', function(str) {
      runCmd(command, str, args);
    });
  } else {
    runCmd(command, str, args);
  }
}

function runCmd(command, str, args) {
  if (string.has(command)) {
    console.log(string.run(command, str, args));
  } else {
    console.error(chalk.red('Unknown command:', command));
  }
}
