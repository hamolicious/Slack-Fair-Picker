import pkg from "@slack/bolt";
const { App } = pkg;
import { FairPicker } from "./fair-picker.js";
import dotenv from "dotenv";
import { addUser } from "./db-loader.js";


dotenv.config();

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // enable the following to use socket mode
  appToken: process.env.APP_TOKEN,
});

app.command("/picka", async ({ command, ack, say }) => {
  try {
    await ack();

		const user = FairPicker.pickUser();
    say(`User ${user.name} has been picked for task: ${command.text}`);

	} catch (error) {
    console.log("err");
    console.error(error);
  }
});

app.command("/add-user", async ({ command, ack, say }) => {
  try {
    await ack();

		const newUser = {
      name: command.text,
      weight: parseInt(process.env.DEFAULT_WEIGHT),
      allTimePicks: 0,
    };
		addUser(newUser)
		say(`User ${newUser.name} has been added to the list`)

	} catch (error) {
    console.log("err");
    console.error(error);
  }
});

app.command("/list-users", async ({ command, ack, say }) => {
  try {
    await ack();

		const users = FairPicker.getUsers();
		let str = '';
		users.forEach(user => {
			str += `\n\t${user.name}`;
		});
		say(`Current user list: ${str}`)


  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app started");
})();
