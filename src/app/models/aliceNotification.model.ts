export class AliceNotification {
  readonly message: string;
  readonly timestamp: string;
  // tslint:disable-next-line:variable-name
  readonly public: boolean;
  readonly id: number;


  // tslint:disable-next-line:variable-name
  constructor(message: string, timestamp: string, isPublic: boolean, id: number) {
    this.message = message;
    this.timestamp = timestamp;
    this.public = isPublic;
    this.id = id;
  }
}
