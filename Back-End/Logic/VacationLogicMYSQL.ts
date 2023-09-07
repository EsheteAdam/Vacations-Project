import { VacationWithKey } from "../Models/VacationWithKey";
import dalMySQL from "../Utils/dalMySQL";
import { Vacation } from "../Models/Vacation";

// add new vacation
const addVacation = async (newVacation: Vacation) => {
  // prevent crush when using single quotes
  const VacationDesc = newVacation.description.replace(/'/g, "''");
  const SQLcommand = `
      INSERT INTO aag_vacations.vacations 
      (destination, description, start_date, end_date, price, picture_file)
      VALUES ('${newVacation.destination}', '${VacationDesc}', 
      '${newVacation.start_date}', '${newVacation.end_date}', '${newVacation.price}', '${newVacation.picture_file}');`;
  return await dalMySQL.execute(SQLcommand);
};

// get all Vacations
const getAllVacations = async (): Promise<VacationWithKey> => {
  const SQLcommand = `SELECT * FROM aag_vacations.vacations`;
  return await dalMySQL.execute(SQLcommand);
};

// get single Vacation
const getSingleVacation = async (vacation_key: number): Promise<Vacation> => {
  const SQLcommand = `SELECT * FROM aag_vacations.vacations WHERE vacation_key=${vacation_key}`;
  const singleVacation = await dalMySQL.execute(SQLcommand);
  return singleVacation[0];
};

// delete vacation
const deleteVacation = (key: number): Promise<boolean> => {
  const SQLcommand = `DELETE FROM aag_vacations.vacations WHERE vacation_key=${key}`;
  return dalMySQL.execute(SQLcommand);
};

// NOT WORKING YET!!!!!!!!
const updateVacation = async (
  vacation_key: number,
  updatedVacation: Vacation
): Promise<boolean> => {
  // get the current vacation data for comparison
  const currentVacation: Vacation = await getSingleVacation(vacation_key); // Implement this function to fetch current data
  // all the updated values will be stored here
  let updatedValues: any = [];
  let SQLcommand = `UPDATE aag_vacations.vacations SET `;
  // check what values changed and push the changed ones to the array
  if (updatedVacation.destination !== currentVacation.destination) {
    updatedValues.push(
      `destination = '${updatedVacation.destination}'`
    );
  }
  if (updatedVacation.description !== currentVacation.description) {
    updatedValues.push(`description = '${updatedVacation.description}'`);
  }
  if (updatedVacation.start_date !== currentVacation.start_date) {
    updatedValues.push(`start_date = '${updatedVacation.start_date}'`);
  }
  if (updatedVacation.end_date !== currentVacation.end_date) {
    updatedValues.push(`end_date = '${updatedVacation.end_date}'`);
  }
  if (updatedVacation.price !== currentVacation.price) {
    updatedValues.push(`price = '${updatedVacation.price}'`);
  }
  if (updatedVacation.picture_file !== currentVacation.picture_file) {
    updatedValues.push(`picture_file = '${updatedVacation.picture_file}'`);
  }
  SQLcommand += updatedValues.join(", ");
  SQLcommand += ` WHERE vacation_key = ${vacation_key};`;
  return await dalMySQL.execute(SQLcommand);
};

export default {
  addVacation,
  getAllVacations,
  deleteVacation,
  updateVacation,
  getSingleVacation,
};