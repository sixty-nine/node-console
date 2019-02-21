import { terminal as term } from 'terminal-kit';

const StrUtils = {
  rpad: (msg: string, fill = ' ', width = term.width) =>
    msg.padEnd(width, fill),

  center: (msg: string, fill = ' ', width = term.width) => {
    const w = width + msg.length;

    const space = Math.floor(w / 2);
    return msg.padStart(space, fill).padEnd(width, fill);
  }
};

export default StrUtils;
