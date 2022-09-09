# Slack-Fair-Picker
A less random, random picker designed to lower the chances of picking the same 3 people every single time. Every time a user is picked, their weight value decreases meaning they are less likely to get picked the next time around.

# Setup
The `.env` file should contain the following
```python
SLACK_SIGNING_SECRET="SIGN_IN_SECRET"
SLACK_BOT_TOKEN="BOT_TOKEN"
APP_TOKEN="APP_TOKEN"
WEIGHT_FALL_OFF=10 # how much to decrease the weight of a user per pick
DEFAULT_WEIGHT=100 # default weight value that is set when a new user is added or when a user's weight goes below 0
DB_PATH="./db/db.json" # the path to the db json file
```

# Commands
`/pick [TASK]` - Picks a random user from the channel.. output: `User @hamolicious has been picked for task: do that thing`
