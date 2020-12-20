export class WeatherData{
  readonly stationId: number;
  readonly windSpeed: number;
  readonly windDirection: number;
  readonly timestampT: Date;
  readonly timestamp: string;
  readonly temperature: number;
  readonly humidity: number;
  readonly pressure: number;
  readonly latitude: number;
  readonly longitude: number;

  constructor(stationId: number, windSpeed: number, windDirection: number,
              timestamp: string, temperature: number, humidity: number,
              latitude: number, longitude: number, pressure: number) {
    this.stationId = stationId;
    this.windSpeed = windSpeed;
    this.windDirection = windDirection;
    this.timestamp = timestamp;
    this.humidity = humidity;
    this.temperature = temperature;
    this.latitude = latitude;
    this.longitude = longitude;
    this.pressure = pressure;
    const t = timestamp.split(/[- :]/);
    // console.log(timestamp);
    // console.log(t);
    this.timestampT = new Date(Date.UTC(
      Number(t[0]),
      Number(t[1]) - 1,
      Number(t[2]),
      Number(t[3]),
      Number(t[4]),
      Number(t[5]),
    ));
  }
}
