export class AliceConfig {
  readonly bikeName: string;
  readonly trackName: string;
  readonly date: string;
  readonly startTime: string;


  constructor(bikeName: string, trackName: string, date: string, startTime: string) {
    this.bikeName = bikeName;
    this.trackName = trackName;
    this.date = date;
    this.startTime = startTime;
  }
}
