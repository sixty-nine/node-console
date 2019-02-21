import Argument from './Argument';
import CommandInterface from './CommandInterface';
import InputInterface from '../Input/InputInterface';
import Option from './Option';
import OutputInterface from '../Output/OutputInterface';

export default abstract class Command implements CommandInterface {

  public execute: (input: InputInterface, output: OutputInterface) => Promise<void>;

  protected _name: string;
  protected _description: string;
  protected _arguments: Argument[] = [];
  protected _options: Option[] = [];

  constructor (name: string, descrption: string = '') {
    this._name = name;
    this._description = descrption;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  public validate = (input: InputInterface) => {

    const argsCount = this._arguments.length;

    this.checkArgumentsCount(input);
    this.checkRequiredArguments(input);
    this.checkRequiredOptions(input);
    this.checkNumericOptions(input);
  };

  public help = (output: OutputInterface, short = false) => {
    output.write('\t' + this._name);
    this._arguments.forEach(arg => output.write(` [${arg.name}]`));
    // this._options.forEach(opt => output.write(opt.isRequired ? ` --${opt.name}` : ` [--${opt.name}]`));
    output.writeLn('\t' + this.description);

    if (!short) {
      output.writeLn();
      this._options.forEach(opt => output.writeLn(
        `\t--${opt.name}` +
        `\t${opt.description} ` +
        `${opt.isRequired ? '[REQUIRED]' : '[OPTIONAL]'}`
      ));
    }
  };

  public addOption = (option: Option): CommandInterface => {
    if (this._options.find(opt => opt.name === option.name)) {
      throw new Error(`Option --${option.name} already exists`);
    }
    this._options.push(option);
    return this;
  };

  public addArgument = (argument: Argument): CommandInterface => {
    if (this._arguments.find(arg => arg.name === argument.name)) {
      throw new Error(`Argument ${argument.name} already exists`);
    }
    this._arguments.push(argument);
    return this;
  };

  private checkArgumentsCount = (input: InputInterface) => {
    if (input.getArguments().length > this._arguments.length) {
      throw new Error('Too many arguments');
    }
  };

  private checkRequiredArguments = (input: InputInterface) => {
    this._arguments.forEach((arg, idx) => {
      if (arg.isRequired && '' === input.getArgument(idx, '')) {
        throw new Error(`Argument ${arg.name} is required`);
      }
    });
  };

  private checkRequiredOptions = (input: InputInterface) => {
    this._options.forEach(opt => {
      if (opt.isRequired && !input.getOption(opt.name, false)) {
        throw new Error(`Option --${opt.name} is required`);
      }
    });
  };

  private checkNumericOptions = (input: InputInterface) => {
    this._options.forEach(opt => {
      if (opt.type === 'numeric') {
        if (isNaN(Number(input.getOption(opt.name, NaN)))) {
          throw new Error(`Option --${opt.name} must be numeric`);
        }
      }
    })
  };
}
