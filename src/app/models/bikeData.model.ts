export class BikeData {
  readonly bikeName: string;
  readonly timestamp: Date;
  readonly deviceType: number;
  readonly speed: number;
  readonly time: number;
  readonly speedGps: number;
  readonly distance: number;
  readonly gear: number;
  readonly power: number;
  readonly heartrate: number;
  readonly cadence: number;
  readonly run: boolean;
  readonly temperature: number;
  readonly humidity: number;
  readonly pressure: number;
  readonly altitude: number;
  readonly latitude: number;
  readonly longitude: number;

  constructor(bikeName: string, timestamp: Date, deviceType: number, speed: number, time: number, speedGps: number, distance: number,
              gear: number, power: number, heartrate: number, cadence: number, run: boolean, temperature: number, humidity: number,
              pressure: number, altitude: number, latitude: number, longitude: number) {
    this.bikeName = bikeName;
    this.timestamp = timestamp;
    this.deviceType = deviceType;
    this.speed = speed;
    this.time = time;
    this.speedGps = speedGps;
    this.distance = distance;
    this.gear = gear;
    this.power = power;
    this.heartrate = heartrate;
    this.cadence = cadence;
    this.run = run;
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.altitude = altitude;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
