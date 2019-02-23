#!/usr/bin/env node

import CLIInput from '../lib/Input/CLIInput';
import DefaultFormatter from '../lib/Formatter/DefaultFormatter';
import StringOutput from '../lib/Output/StringOutput';
import App from '../lib/App';
import WeatherCommand from './WeatherCommand';
import HelloCommand from './HelloCommand';

(() => {

  const input = new CLIInput();
  const output = new StringOutput();

  const app = new App('My App', 'A demo application');
  app.add(new WeatherCommand());
  app.add(new HelloCommand());

  app.run(input, output).finally(() => {
    const f = new DefaultFormatter();
    console.log(f.format(output.content));
  });

})();
