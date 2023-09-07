import dalMySQL from "../Utils/dalMySQL";

// add follow to vacation
const addFollower = async (user_key: number, vacation_key: number) => {
    const SQLcommand = `
    INSERT INTO aag_vacations.followers
    (user_key, vacation_key)
    VALUES ('${user_key}', '${vacation_key}')`;
    return await dalMySQL.execute(SQLcommand);
};

// remove follow from vacation
const removeFollower = async (user_key: number, vacation_key: number) => {
    const SQLcommand = `DELETE FROM aag_vacations.followers WHERE user_key=${user_key} AND vacation_key=${vacation_key} `;
    return await dalMySQL.execute(SQLcommand);
};

// remove all followers when vacation is removed
const removeAllFollowers = async (vacation_key: number) => {
    const SQLcommand = `DELETE FROM aag_vacations.followers WHERE vacation_key=${vacation_key} `;
    return await dalMySQL.execute(SQLcommand);
};

// get all followers
const getAllFollowers = async (): Promise<[]> => {
    const SQLcommand = `SELECT * FROM aag_vacations.followers`;
    return await dalMySQL.execute(SQLcommand);
};

export default {
    addFollower,
    removeFollower,
    getAllFollowers,
    removeAllFollowers,
};