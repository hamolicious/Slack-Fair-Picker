import pkg from "@slack/bolt";
const { App } = pkg;
import { FairPicker } from "./src/fair-picker.js";
import dotenv from "dotenv";
import { getUserID } from "./src/db-loader.js";


dotenv.config();

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // enable the following to use socket mode
  appToken: process.env.APP_TOKEN,
});

app.command("/pick", async ({ command, ack, say }) => {
  try {
    await ack();

		const channelUsers = await app.client.users.list();
		const user = FairPicker.pickUser(channelUsers);

		say(`User <@${user}> has been picked for task: ${command.text}`);

	} catch (error) {
    console.log("err");
    console.error(error);
  }
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app started");
})();
