import figlet from 'figlet/lib/node-figlet';
import minimist from 'minimist';
import node_fetch from 'node-fetch';
import ora from 'ora';
import { terminal as term } from 'terminal-kit';
import Console from './lib/Console';
import StrUtils from './lib/StrUtils';

const wttrIn = async (city: string, format = 4): Promise<string> => {
  const data = await node_fetch(
    `https://wttr.in/${city}?silent_lang=fr&format=${format}`
  );
  return (await data.text()).replace('\n', '').replace(/[^ -~]+/g, ''); // Remove non-printable chars, https://stackoverflow.com/a/24231346/643106
};

const weatherIn = (cities: ReadonlyArray<string>): Promise<ReadonlyArray<string>> =>
  Promise.all(cities.map(city => wttrIn(city)));

void (async () => {
  const { _: cmd, ...args } = minimist(process.argv.slice(2), {
    alias: { v: 'version', f: 'foobar', l: 'lang' },
    boolean: ['version', 'foobar'], // --version
    string: ['lang'], // --lang xml
  });
  console.log(cmd, args);
  // process.exit(1);

  if (cmd[0] === 'help' || args.h || args.help) {
    console.log(`
    splash <options>

    --title ............ Title text
    --image ............ Image path
    --cities ........... Coma separated list of cities for weather forecast
    --version, -v ...... Show version
    --help, -h ......... Show this help
    `);
    process.exit(1);
  } else if (args.v || args.version) {
    const { version } = require(__dirname + '/../../package.json');
    console.log(version);
    process.exit(0);
  }

  const imageWidth = 20;
  const colOffset = 2;
  const title = args.title || 'Welcome!';
  const image = args.image || __dirname + '/../../assets/avatar.400x400.jpeg';

  const spinner = ora().start();
  spinner.color = 'blue';
  spinner.text = 'Loading...';

  try {
    const cities = args.cities
      ? args.cities.split(',')
      : ['Fribourg', 'Bern', 'Zurich'];
    const forecast = await weatherIn(cities);
    const options = {
      day: 'numeric',
      month: 'numeric',
      weekday: 'long',
      year: 'numeric'
    };
    const info = [
      `Date: ${new Date().toLocaleDateString('fr-CH', options)}`
    ].concat(forecast);
    const data = figlet.textSync(title);
    const rightColWidth = term.width - imageWidth - colOffset;

    let titleWidth = 0;
    const lines = data.split('\n');

    spinner.stop();
    term.fullscreen(true);
    term.nextLine(1);

    info.forEach(f =>
      Console.writeLn(
        (term.str.bgBlue(
          StrUtils.center(f.padEnd(25), ' ', rightColWidth)
        ) as unknown) as string,
        imageWidth + colOffset
      )
    );

    term.styleReset();

    lines.forEach(line => {
      titleWidth = line.length;
      Console.writeLn(
        (term.str.bold(line) as unknown) as string,
        imageWidth + colOffset
      );
    });

    term.styleReset().nextLine(2);

    term
      .saveCursor()
      .moveTo(0, 2)
      .drawImage(image, {
        shrink: { width: imageWidth, height: imageWidth }
      })
      .then(() => term.restoreCursor().processExit(0));
  } catch (err) {
    spinner.stop();
    Console.error('Something went wrong...', err);
  }
})();
