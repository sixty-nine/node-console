export default interface OutputInterface {
  write: (msg?: string|string[]) => OutputInterface;
  writeLn: (msg?: string|string[]) => OutputInterface;
}
