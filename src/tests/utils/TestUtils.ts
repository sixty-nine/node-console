import StringInput from '../../lib/Input/StringInput';
import App from '../../lib/App';
import OutputInterface from '../../lib/Output/OutputInterface';
import StringOutput from '../../lib/Output/StringOutput';
import Command from '../../lib/Command/Command';

export const createApp = (title = 'Test App', commands: Command[] = []): App => {
  const app = new App(title);
  app.addCommands(commands);
  return app;
};

export const runAppWith = async (app: App, parameters: string, output: OutputInterface = null) => {
  const out = null === output ? new StringOutput() : output;
  await app.run(new StringInput(parameters), out);
  return out.content;
};

export const runCmdWith = async (cmd: Command, parameters: string, output: OutputInterface = null) => {
  const out = null === output ? new StringOutput() : output;
  await cmd.execute(new StringInput(parameters), out);
  return out.content;
};

export const validateCmdArgs = (cmd: Command, parameters: string): boolean => {
  return cmd.validate(new StringInput(parameters));
};

export const expectRejection = async (t, p: Promise<any>, expectedErrMsg: string) => {
  await p.then(
    () => t.fail('No exception occurred'),
    (err) => t.is(expectedErrMsg, err.message)
  );
};

export const expectError = (t, fn: () => void, expectedErrMsg: string) => {
  const res = t.throws(fn);
  t.is(res.message, expectedErrMsg);
}
