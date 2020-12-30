export class AliceComment {
  readonly message: string;
  readonly timestamp: string;
  readonly username: string;


  constructor(message: string, timestamp: string, username: string) {
    this.message = message;
    this.timestamp = timestamp;
    this.username = username;
  }
}
