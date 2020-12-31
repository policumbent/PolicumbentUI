export class AliceComment {
  readonly message: string;
  readonly timestamp: string;
  readonly username: string;
  readonly id: number;


  constructor(message: string, timestamp: string, username: string, id: number) {
    this.message = message;
    this.timestamp = timestamp;
    this.username = username;
    this.id = id;
  }
}
