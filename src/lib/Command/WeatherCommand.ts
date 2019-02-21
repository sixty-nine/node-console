import Command from './Command';
import InputInterface from '../Input/InputInterface';
import OutputInterface from '../Output/OutputInterface';
import node_fetch from 'node-fetch';
import Argument from './Argument';
import Option from './Option';

export default class WeatherCommand extends Command {

  constructor() {
    super('weather', 'Show weather forecast');
    this.addArgument(new Argument('city', 'Show weather for this city', Argument.ARGUMENT_REQUIRED));
    this.addOption(new Option('format', 'Output format (1-4)', Option.OPTION_REQUIRED));
  }

  public execute = async (input: InputInterface, output: OutputInterface): Promise<void> => {
    const city = input.getFirstArgument();
    const format = input.getOption('format', '1');

    if (!city) {
      throw new Error('Argument "city" is required');
    }

    if (isNaN(Number(format))) {
      throw new Error('Option --format must be numeric');
    }

    try {
      const weather = await this.wttrIn(city, format);
      output
        .writeLn(weather)
        .writeLn()
      ;

    } catch (err) {
      throw new Error('Something went wrong: ' + err.message);
    }
  }

  private wttrIn = async (city: string, format = 4): Promise<string> => {
    const data = await node_fetch(
      `https://wttr.in/${city}?silent_lang=fr&format=${format}`
    );
    return (await data
      .text())
      .replace('\n', '')
      // Remove non-printable chars, https://stackoverflow.com/a/24231346/643106
      .replace(/[^ -~]+/g, '')
    ;
  };
}
