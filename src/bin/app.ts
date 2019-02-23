#!/usr/bin/env node

import MyApp from './MyApp';
import CLIInput from '../lib/Input/CLIInput';
import DefaultFormatter from '../lib/Formatter/DefaultFormatter';
import StringOutput from '../lib/Output/StringOutput';

const app = new MyApp();
const input = new CLIInput();
const output = new StringOutput();

app.run(input, output).finally(() => {
  const f = new DefaultFormatter();
  console.log(f.format(output.content));
});
