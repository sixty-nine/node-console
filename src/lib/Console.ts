// import NextGenEvents from 'nextgen-events';
// import { terminal as term } from 'terminal-kit';
// import StrUtils from './StrUtils';
//
// const Console = {
//   nextLine: (n: number = 1) => term.nextLine(n),
//
//   error: (msg: string, err) =>
//     term
//       .bgRed(StrUtils.rpad('', '='))
//       .bgRed(StrUtils.rpad(' '))
//       .bgRed(StrUtils.center(msg))
//       .bgRed(StrUtils.rpad(' '))
//       .bgRed(StrUtils.rpad('', '='))
//       .bgRed(err)
//       .nextLine(2),
//
//   writeLn: (msg: string, left: number = 0) => {
//     term
//       .right(left)(msg.substr(0, term.width - left))
//       .nextLine(1);
//   }
// };
//
// export default Console;
