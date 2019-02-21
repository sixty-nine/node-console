import { terminal as term } from 'terminal-kit';
import OutputInterface from './OutputInterface';

export default class CLIOutput implements OutputInterface {
  public write = (msg: string | string[] = ''): OutputInterface => {
    const msgArr = Array.isArray(msg) ? msg : [msg];
    msgArr.forEach(m => term(m));
    return this;
  }
  public writeLn = (msg: string | string[] = ''): OutputInterface => {
    const msgArr = Array.isArray(msg) ? msg : [msg];
    msgArr.forEach(m => term(m + '\n'));
    return this;
  }
}
