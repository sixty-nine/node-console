#!/usr/bin/env node

import { App, CLIInput, DefaultFormatter, StringOutput } from '../lib';
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
