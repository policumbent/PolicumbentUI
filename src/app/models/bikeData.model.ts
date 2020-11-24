export class BikeData {
  readonly deviceType: string;
  readonly deviceTypeInt: number;
  readonly bikeName: string;
  readonly timeStr: string;
  readonly time: number;
  readonly cpuTemp: number;
  readonly timestampT: Date;
  readonly timestamp: string;

  readonly speedGps: number;
  readonly latitude: number;
  readonly longitude: number;
  readonly altitude: number;

  readonly power: number;
  readonly speed: number;
  readonly distance: number;
  readonly heartrate: number;
  readonly cadence: number;
  readonly gear: number;

  readonly targetSpeed: number;
  readonly targetPower: number;

  readonly temperature: number;
  readonly humidity: number;
  readonly pressure: number;

  readonly accX: number;
  readonly accY: number;
  readonly accZ: number;

  readonly accXMax: number;
  readonly accYMax: number;
  readonly accZMax: number;


  constructor(deviceType: string, deviceTypeInt: number, bikeName: string, timeStr: string, time: number, cpuTemp: number,
              timestamp: string, speedGps: number, latitude: number, longitude: number, altitude: number, power: number, speed: number,
              distance: number, heartrate: number, cadence: number, gear: number, targetSpeed: number, targetPower: number,
              temperature: number, humidity: number, pressure: number, accX: number, accY: number, accZ: number, accXMax: number,
              accYMax: number, accZMax: number) {

    this.deviceType = deviceType;
    this.deviceTypeInt = deviceTypeInt;
    this.bikeName = bikeName;
    this.timeStr = timeStr;
    this.time = time;
    this.cpuTemp = cpuTemp;
    this.timestamp = timestamp;
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
    this.speedGps = speedGps;
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
    this.power = power;
    this.speed = speed;
    this.distance = distance;
    this.heartrate = heartrate;
    this.cadence = cadence;
    this.gear = gear;
    this.targetSpeed = targetSpeed;
    this.targetPower = targetPower;
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.accX = accX;
    this.accY = accY;
    this.accZ = accZ;
    this.accXMax = accXMax;
    this.accYMax = accYMax;
    this.accZMax = accZMax;
  }
}
