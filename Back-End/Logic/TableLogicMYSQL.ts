import dalMySQL from "../Utils/dalMySQL";

// CREATE USERS TABLE IF NOT EXISTS
const createUsersTable = () => {
  const SQLcommand = `
  CREATE TABLE IF NOT EXISTS aag_vacations.users (
    user_key INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(90) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL,
    role VARCHAR(45) NOT NULL,
    PRIMARY KEY (user_key));`;
  dalMySQL.execute(SQLcommand);
};

// CREATE VACATIONS TABLE IF NOT EXISTS
const createVacationsTable = () => {
  const SQLcommand = `
  CREATE TABLE IF NOT EXISTS aag_vacations.vacations (
    vacation_key INT NOT NULL AUTO_INCREMENT,
    destination VARCHAR(45) NOT NULL,
    description VARCHAR(400) NOT NULL,
    start_date VARCHAR(45) NOT NULL,
    end_date VARCHAR(45) NOT NULL,
    price INT NOT NULL,
    picture_file VARCHAR(90) NOT NULL,
    PRIMARY KEY (vacation_key));`;
  dalMySQL.execute(SQLcommand);
};

// CREATE  FOLLOWING TABLE IF NOT EXISTS
const createFollowTable = () => {
  const SQLcommand = `
  CREATE TABLE IF NOT EXISTS aag_vacations.followers (
  user_key INT NOT NULL,
  vacation_key INT NOT NULL,
  FOREIGN KEY (user_key) REFERENCES aag_vacations.users(user_key),
  FOREIGN KEY (vacation_key) REFERENCES aag_vacations.vacations(vacation_key)
  );`;
  dalMySQL.execute(SQLcommand);
};

export default {
  createUsersTable,
  createVacationsTable,
  createFollowTable,
};