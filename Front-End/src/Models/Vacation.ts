export class Vacation {
  public destination: string;
  public description: string;
  public start_date: string;
  public end_date: string;
  public price: number;
  public picture_file: string;
  constructor (
    destination: string,
    description: string,
    start_date: string,
    end_date: string,
    price: number,
    picture_file: string
  ) {
    this.destination = destination;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.price = price;
    this.picture_file = picture_file;
  }
}