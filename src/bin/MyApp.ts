import App from '../lib/App';
import WeatherCommand from './WeatherCommand';
import HelloCommand from './HelloCommand';

export default class MyApp extends App {
  constructor() {
    super('My App', 'A demo application');
    this.add(new WeatherCommand());
    this.add(new HelloCommand());
  }
}
