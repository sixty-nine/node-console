import figlet from 'figlet/lib/node-figlet';
import { terminal as term } from 'terminal-kit';
import node_fetch from 'node-fetch';
import ora from 'ora';
import minimist from 'minimist';

const wttrIn = async (city: string, format = 4): Promise<string> => {
  const data = await node_fetch(`https://wttr.in/${city}?silent_lang=fr&format=${format}`)
  return (await data.text())
    .replace('\n', '')
    .replace(/[^ -~]+/g, "") // Remove non-printable chars, https://stackoverflow.com/a/24231346/643106
  ;
};

const weatherIn = (cities: string[]): Promise<string[]> => Promise.all(cities.map(city => wttrIn(city)));

void async function () {

  const rpad = (msg: string, fill = ' ', width = term.width) => msg.padEnd(width, fill);

  const center = (msg: string, fill = ' ', width = term.width) => {
    const w = width + msg.length;

    let space = Math.floor(w / 2);
    return msg.padStart(space, fill).padEnd(width, fill);
  };

  const error = (msg: string, err) => term
    .bgRed(rpad('', '='))
    .bgRed(rpad(' '))
    .bgRed(center(msg))
    .bgRed(rpad(' '))
    .bgRed(rpad('', '='))
    .bgRed(err)
    .nextLine(2)
  ;

  const { _: cmd, ...args } = minimist(process.argv.slice(2));

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
    const cities = args.cities ? args.cities.split(',') : ['Fribourg', 'Bern', 'Zurich'];
    const forecast = await weatherIn(cities);
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const info = [`Date: ${new Date().toLocaleDateString('fr-CH', options)}`].concat(forecast);
    const data = figlet.textSync(title);
    const rightColWidth = term.width - imageWidth - colOffset;

    let titleWidth = 0;
    let lines = data.split('\n');

    spinner.stop();
    term.fullscreen(true);
    term.nextLine(1);

    info.forEach(f => term
      .right(imageWidth + colOffset)
      .bgBlue(center(f.padEnd(25), ' ', rightColWidth))
      .nextLine(1)
    );

    lines.forEach(line => {
      titleWidth = line.length;
      term
        .right(imageWidth + colOffset)
        .bold(line.substr(0, rightColWidth))
        .nextLine(1)
      ;
    });

    term.styleReset().nextLine(2);

    term
      .saveCursor()
      .moveTo(0, 2)
      .drawImage(image, {
        shrink: { width: imageWidth, height: imageWidth }
      })
      .then(() => term.restoreCursor().processExit(0))
    ;

  } catch (err) {
    spinner.stop();
    error('Something went wrong...', err);
  }

}();
