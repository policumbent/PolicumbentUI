export class TableElement {
  name: string;
  min: number;
  max: number;
  sum: number;
  count: number;
  unit: string;

  constructor(name: string, unit: string) {
    this.name = name;
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
    this.sum = 0;
    this.count = 0;
    this.unit = unit;
  }

  get average(): number{
    const average = Math.round(100 * (this.sum / this.count)) / 100;
    return isNaN(average) ? 0 : average;
  }

  addValue(value: number): void{
    if (value > this.max) {
      this.max = value;
    }
    if (value < this.min){
      this.min = value;
    }
    this.count++;
    this.sum += value;
  }

  reset(): void{
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
    this.sum = 0;
    this.count = 0;
  }
}
