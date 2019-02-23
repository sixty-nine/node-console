import Command from '../lib/Command/Command';
import InputInterface from '../lib/Input/InputInterface';
import OutputInterface from '../lib/Output/OutputInterface';
import Argument from '../lib/Command/Argument';
import Option from '../lib/Command/Option';
import node_fetch from 'node-fetch';

export default class HelloCommand extends Command {

  constructor() {
    super('hello', 'Say hello');
    this.addArgument(new Argument('name', 'Who to say hello'));
  }

  public execute = async (input: InputInterface, output: OutputInterface): Promise<void> => {
    const name = input.getFirstArgument() || 'world';
    output.writeLn(`Hello ${name}`);
  };
}
