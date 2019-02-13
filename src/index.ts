
export * from './lib/async';
export * from './lib/hash';
export * from './lib/number';

import { terminal as term } from 'terminal-kit';
import node_fetch from 'node-fetch';

global['fetch'] = node_fetch;

term.fullscreen(true);

const figlet = require('figlet');


figlet('Welcome Dan!', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }

  // ----- WTTR.IN ------------------------------------------------
  // node_fetch('https://wttr.in/Fribourg --silent_lang=fr', {
  //   headers: {'Content-Type': 'text/ansi'}
  // }).then(
  //   async data => console.log(await data.text()),
  //   err => console.log('ERR', err)
  // );
  // --------------------------------------------------------------

  term.wrapColumn({ x: 25, width: term.width - 40 });
  term.wrap.bold(data);

  const titleWidth = data.split('\n')[0].length;
  const date = new Date().toString();
  const halfWidth = Math.floor(titleWidth - date.length);

  term.wrapColumn({ x: 25, width: term.width - 40 });
  term
    .down(1)
    .wrap.bgBlue(' '.repeat(titleWidth))
    .styleReset('\n')
    .wrap.bgBlue(' '.repeat(halfWidth / 2))
    .bgBlue(date)
    .bgBlue(' '.repeat(halfWidth / 2))
    .styleReset('\n')
    .wrap.bgBlue(' '.repeat(titleWidth))
    .styleReset('\n\n')
    .down(2)
  ;

  term
    .saveCursor()
    .moveTo(0, 2)
    .drawImage(
      '/home/dev/dan-console/_data/avatar.400x400.jpeg',
      { shrink: { width: 20, height: 20 } })
    .then(() => {
      term.restoreCursor();
      // process.exit(0);
    });

});
