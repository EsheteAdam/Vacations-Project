import { Vacation } from "./Vacation";

export class VacationWithKey extends Vacation {
  [x: string]: any;
  public vacation_key: number;

  constructor (
    destination: string,
    description: string,
    start_date: string,
    end_date: string,
    price: number,
    picture_file: string,
    vacation_key: number
  ) {
    super(
      destination,
      description,
      start_date,
      end_date,
      price,
      picture_file
    );
    this.vacation_key = vacation_key;
  }
}