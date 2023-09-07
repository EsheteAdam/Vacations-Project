import { vacationError } from "./VacationErrors";

// add follow error class
export class AddFollowError extends vacationError {
  public constructor(vacation_key: number) {
    super(
      400,
      `There was an error adding a follow to the vacation: ${vacation_key}`
    );
  }
}

// remove follow error class
export class RemoveFollowError extends vacationError {
  public constructor(vacation_key: number) {
    super(
      400,
      `There was an error removing the follow from the vacation: ${vacation_key}`
    );
  }
}

// remove all followers error class
export class RemoveAllFollowersError extends vacationError {
  public constructor(vacation_key: number) {
    super(
      400,
      `There was an error removing all followers from the vacation: ${vacation_key}`
    );
  }
}

// get all followers error class
export class GetAllFollowersError extends vacationError {
  public constructor() {
    super(
      404,
      `There was an error getting all followers from all the vacations`
    );
  }
}