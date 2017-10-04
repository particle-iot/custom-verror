# Custom VError

Simple class extending [VError](https://www.npmjs.com/package/verror) for easy custom error creation.

## Usage

Here is the basic usage. For more use cases, see [the tests](test/CustomError.spec.js).

#### 1. Define your error

`UserNotAllowedError.js`
```js
'use strict';

const CustomVError = require('custom-verror');

// Replace UserNotAllowedError with your custom error name
module.exports = class UserNotAllowedError extends CustomVError {
	constructor(...args) {
		super(...args);
		// Provide a default message
		this.message = this.message || 'User is not allowed to perform this action';
	}
}
```

#### 2. Throw your error

```js
const UserNotAllowedError = require('./UserNotAllowedError');

function performAction() {
	if (!isAllowed) {
		throw new UserNotAllowedError({
			// You can provide some error metadata. This will be appended to the message
			info: {
				user_id: user._id
			}
		})
	}
}
```

#### 3. Catch your error

```js
try {
	performAction();
} catch (ex) {
	if (ex instanceof UserNotAllowedError) {
		numberOfTimesUsersTriedToDoSomethingTheyWerentSupposedTo++;
		// This will log the default message and the metadata in following format:
		// "User is not allowed to perform this action user_id=FOO"
		console.log(ex);
	}
}
```
