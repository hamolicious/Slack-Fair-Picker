import { loadDB, updateUser } from "./db-loader.js";

export const FairPicker = {

	getUsers: function() {
		return loadDB().users;
	},

	constructPickingBuffer: function() {
		const users = this.getUsers();
		let buffer = [];

		users.forEach(user => {
			for (var i = 0; i < user.weight; i++) {
				buffer.push(user)
			}
		});

		return buffer;
	},

	pickUser: function() {
		const buffer = this.constructPickingBuffer();

		if (buffer.length == 0) {
      return {name: "[NO USERS PRESENT... use `/add-user <USER>` to add users]"};
    }

		const index = parseInt(Math.random() * buffer.length);
		const user = buffer[index];

		updateUser(user.name)
		return user
	}
}



