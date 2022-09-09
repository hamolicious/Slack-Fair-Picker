import { loadDB, makeSureUsersExists, updateUser } from "./db-loader.js";

export const FairPicker = {
  filterUsers: function (channelUsers) {
    let users = [];
    channelUsers.members.forEach((user) => {
      if (!user.is_bot && user.name !== "slackbot") users.push(user.name);
    });

    return users;
  },

  constructPickingBuffer: function (users) {
    let buffer = [];
		const data = loadDB();

		("buffer data", data);

    users.forEach((user) => {
			("creating buffer for", user, data[user]);
      for (var i = 0; i < data[user].weight; i++) {
        buffer.push(user);
      }
    });

		("final buffer", buffer);

    return buffer;
  },

  getIndex(buffer) {
    return Math.max(
      Math.min(parseInt(Math.random() * buffer.length), buffer.length - 1),
      0
    );
  },

  pickUser: function (channelUsers) {
    const users = this.filterUsers(channelUsers);
		makeSureUsersExists(users);
    const buffer = this.constructPickingBuffer(users);

    if (buffer.length == 0) {
      return '';
    }

    const index = this.getIndex(buffer);
    const user = buffer[index];

    updateUser(user);
    return user;
  },
};
