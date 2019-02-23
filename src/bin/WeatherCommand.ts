import Command from '../lib/Command/Command';
import InputInterface from '../lib/Input/InputInterface';
import OutputInterface from '../lib/Output/OutputInterface';
import Argument from '../lib/Command/Argument';
import Option from '../lib/Command/Option';
import node_fetch from 'node-fetch';

export default class WeatherCommand extends Command {

  constructor() {
    super('weather', 'Show weather forecast');
    this.addArgument(new Argument('city', 'Show weather for this city', Argument.ARGUMENT_REQUIRED));
    this.addOption(new Option('format', 'Output format (1-4)'));
    this.addOption(new Option('forecast', 'Forecast', Option.OPTION_BOOLEAN));
  }

  public execute = async (input: InputInterface, output: OutputInterface): Promise<void> => {
    const city = input.getFirstArgument();
    const format = input.getOption('format', '4');
    const forecast = input.getOption('forecast', false);

    try {
      const weather = await this.wttrIn(city, format, forecast);
      output
        .writeLn(weather)
        .writeLn()
      ;

    } catch (err) {
      throw new Error('Something went wrong: ' + err.message);
    }
  }

  private wttrIn = async (city: string, format = 4, forecast = false): Promise<string> => {
    const url = `https://wttr.in/${city}${!forecast ? `?format=${format}` : ''}`;
    const data = await node_fetch(url, { headers: { 'User-Agent': 'curl' } });

    if (data.status >= 400) {
      const err = await data.text();
      throw new Error(data.statusText);
    }

    return (data.text())
      // .replace('\n', '')
      // Remove non-printable chars, https://stackoverflow.com/a/24231346/643106
      // .replace(/[^ -~]+/g, '')
    ;
  };
}
