// require the fs module that's built into Node.js
import { readFileSync, writeFileSync, existsSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

export function loadDB() {
	if (!existsSync(process.env.DB_PATH)) {
		writeFileSync(process.env.DB_PATH, JSON.stringify({
			users: []
		}));
	}

  let raw = readFileSync(process.env.DB_PATH);
  let data = JSON.parse(raw);

	return data;
}

export function saveDB(data) {
	writeFileSync(process.env.DB_PATH, JSON.stringify(data));
}

export function makeSureUsersExists(usernames) {
	const data = loadDB();
	usernames.forEach(username => {
		if (!data[username]){
			data[username] = {
        picked: 0,
        allTimePicked: 0,
        weight: parseInt(process.env.DEFAULT_WEIGHT)
      };
		}
	});
	saveDB(data);
}

export function updateUser(username) {
	const data = loadDB();

	data[username].picked++;
	data[username].allTimePicked++;
	data[username].weight -= parseInt(process.env.WEIGHT_FALL_OFF);

	if (data[username].weight <= 0)
		data[username].weight = parseInt(process.env.DEFAULT_WEIGHT);

	saveDB(data);
}



