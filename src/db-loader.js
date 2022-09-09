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

export function addUser(user) {
  let raw = readFileSync(process.env.DB_PATH);
  let data = JSON.parse(raw);
	data.users.push(user);

	writeFileSync(process.env.DB_PATH, JSON.stringify(data));
}

export function updateUser(username) {
  let raw = readFileSync(process.env.DB_PATH);
  let data = JSON.parse(raw);

	for (let i = 0; i < data.users.length; i++) {
		if (data.users[i].name == username) {
			data.users[i].allTimePicks++;
			data.users[i].weight -= parseInt(process.env.WEIGHT_FALL_OFF);

			if (data.users[i].weight <= 0) {
				data.users[i].weight = 100;
			}

			break;
		}
	}

  writeFileSync(process.env.DB_PATH, JSON.stringify(data));
}



