export class WeatherStation {
  readonly id: number;
  readonly description: string;

  constructor(id: number, description: string) {
    this.id = id;
    this.description = description;
  }
}
