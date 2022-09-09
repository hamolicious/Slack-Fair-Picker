import { FairPicker } from "../src/fair-picker.js";
import { writeFileSync } from "fs";
import { loadDB } from "../src/db-loader.js";

let data = {};
const itterations = 10000;
let lastUser;

loadDB().users.forEach((user) => {
  data[user.name] = {
    picks: 0,
		consec: 0
  };
});

for (var i = 0; i < itterations; i++) {
  const user = FairPicker.pickUser();
  data[user.name].picks++;

	if (lastUser == user.name) {
		data[user.name].consec++;
	}
	lastUser = user.name;

	console.log(`Progress ${parseInt((i / itterations) * 100)}%`)
}

writeFileSync('test/out.json', JSON.stringify(data))

