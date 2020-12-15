export class WeatherData{
  readonly stationId: number;
  readonly windSpeed: number;
  readonly windDirection: number;
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
  }
}
