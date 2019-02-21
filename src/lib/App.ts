import Command from './Command/Command';
import CommandInterface from './Command/CommandInterface';
import InputInterface from './Input/InputInterface';
import OutputInterface from './Output/OutputInterface';


export default class App {
  private _name: string;
  private _description: string;
  private _commands: { [key: string]: CommandInterface } = {};

  constructor(name: string, description: string = '') {
    this._name = name;
    this._description = description;
  }

  public get commands(): CommandInterface[] {
    return Object.values(this._commands);
  }

  public add = (c: CommandInterface): App => {

    if (this._commands[c.name]) {
      throw new Error('Command already exist');
    }

    this._commands[c.name] = c;

    return this;
  };

  public showHelp = (output: OutputInterface) => {
    output.write('-- ');
    output.writeLn(this._name + (this._description ? ` - ${this._description}` : ''));
    output.writeLn();

    this.commands.forEach((cmd: Command) => cmd.help(output, true));
  }

  public run = async (input: InputInterface, output: OutputInterface): Promise<void> => {
    const action = input.getFirstArgument();

    if (!action || action === 'help') {
      return this.showHelp(output);
    }

    const cmd = this._commands[action];

    if (!cmd) {
      throw new Error(`Command "${action}" does not exist`);
    }

    if (input.getOption('help', false) || input.getOption('h', false )) {
      console.log('HELP ' + cmd.name);
    }

    input.shiftArgument();
    cmd.validate(input);
    await cmd.execute(input, output);
  };
}
