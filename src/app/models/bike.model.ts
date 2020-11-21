export class Bike {
  readonly name: string;
  readonly driver: string;
  readonly enabled: boolean;

  constructor(name: string, driver: string, enabled: boolean) {
    this.name = name;
    this.driver = driver;
    this.enabled = enabled;
  }
}
