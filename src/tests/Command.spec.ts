import test from 'ava';
import TestCommand from './fixtures/TestCommand';
import Option from '../lib/Command/Option';
import Argument from '../lib/Command/Argument';

test('Command has unique options', t => {
  const res = t.throws(() =>  new TestCommand().addOption(new Option('opt1')));
  t.is(res.message, 'Option --opt1 already exists');
});

test('Command has unique arguments', t => {
  const res = t.throws(() =>  new TestCommand().addArgument(new Argument('arg1')));
  t.is(res.message, 'Argument arg1 already exists');
});
