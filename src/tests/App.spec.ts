// tslint:disable:no-expression-statement
import test from 'ava';
import App from '../lib/App';
import StringInput from '../lib/Input/StringInput';
import StringOutput from '../lib/Output/StringOutput';
import TestCommand from './fixtures/TestCommand';
import Option from '../lib/Command/Option';
import Argument from '../lib/Command/Argument';

const createApp = (): App => {
  const app = new App('Test App');
  app.add(new TestCommand());
  return app;
};

const expectError = async (t, p: Promise<any>, expectedErrMsg: string) => {
  await p.then(
    () => t.fail('No exception occurred'),
    (err) => t.is(expectedErrMsg, err.message)
  );
};

test('App has unique command names', t => {
  const res = t.throws(() =>  createApp().add(new TestCommand()));
  t.is(res.message, 'Command already exist');
});

test('App bad command', async t => {
  await expectError(t,
    createApp().run(new StringInput('foobar'), new StringOutput()),
    'Command "foobar" does not exist',
  );
});

test('App no arg1 arguments', async t => {
  await expectError(t,
    createApp().run(new StringInput('test --opt1'), new StringOutput()),
    'Argument arg1 is required',
  );
});

test('App bad --opt1 option', async t => {
  await expectError(t,
    createApp().run(new StringInput('test Fribourg --opt1 ABC'), new StringOutput()),
    'Option --opt1 must be numeric',
  );
});

test('App too many arguments', async t => {
  await expectError(t,
    createApp().run(new StringInput('test Fribourg Bern --opt1 4'), new StringOutput()),
    'Too many arguments',
  );
});

test('App no --opt1 option', async t => {
  await expectError(t,
    createApp().run(new StringInput('test Fribourg'), new StringOutput()),
    'Option --opt1 is required',
  );
});

test('app', async t => {
  const output = new StringOutput();
  const app = createApp();
  t.is(1, app.commands.length);
  // t.is('my:cmd', app.commands[0].name);
  // t.is('My command', app.commands[0].description);
  // t.deepEqual([], app.commands[0]._arguments);
  // t.deepEqual([], app.commands[0]._options);
  t.is('function', typeof app.commands[0].execute);


  await app.run(new StringInput('test fribourg --opt1 4'), output);
  // console.log(output.buffer);
});
