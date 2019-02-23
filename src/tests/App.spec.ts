// tslint:disable:no-expression-statement
import test from 'ava';
import App from '../lib/App';
import StringInput from '../lib/Input/StringInput';
import StringOutput from '../lib/Output/StringOutput';
import TestCommand from './fixtures/TestCommand';
import OutputInterface from '../lib/Output/OutputInterface';

const createApp = (): App => {
  const app = new App('Test App');
  app.add(new TestCommand());
  return app;
};

const runAppWith = async (parameters: string, output: OutputInterface = null) => {
  const out = null === output ? new StringOutput() : output;
  await createApp().run(new StringInput(parameters), out);
  return out.content;
};

const expectRejection = async (t, p: Promise<any>, expectedErrMsg: string) => {
  await p.then(
    () => t.fail('No exception occurred'),
    (err) => t.is(expectedErrMsg, err.message)
  );
};

test(
  'Has unique command names',
  t => {
    const res = t.throws(() => createApp().addCommands([
      new TestCommand(), new TestCommand(),
    ]));
    t.is(res.message, 'Command already exist');
  }
);

test('app', async t => {
  const app = createApp();
  t.is(1, app.commands.length);
  t.is('test', app.commands[0].name);
  t.is('function', typeof app.commands[0].execute);
});
