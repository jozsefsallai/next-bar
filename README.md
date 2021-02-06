# next-bar: Better API Routes for Next.js

Higher order function for Next.js that makes it easier to orchestrate API route
handlers based on the request's method.

## What?

**Instead of having to do this:**

```js
// pages/api/hello.ts
export default function(req, res) {
  if (req.method === 'GET') {
    return res.send('Hello from GET!');
  }

  if (req.method === 'POST') {
    return res.send('Hello from POST!');
  }

  // ...
}
```

**you can now do this:**

```js
// pages/api/hello.ts
import bar from 'next-bar';

function get(req, res) {
  return res.send('Hello from GET!');
}

function post(req, res) {
  return res.send('Hello from POST!');
}

export default bar({ get, post });
```

## Usage

**1. Install the module:**

Using npm:

```
npm install next-bar
```

Using yarn:

```
yarn add next-bar
```

**2. Define per-method routes:**

```js
// Tip: You can export these functions in separate files and import them in your
// route to organize your source code better.

function getUser(req, res) {
  const user = User.findOne(/* ... */);
  return res.json({ ok: true, user });
}

function createUser(req, res) {
  const user = User.create(/* ... */);;
  return res.json({ ok: true, user });
}

// ...
```

**3. Import the library and use it as your API route's default export:**

```js
import bar from 'next-bar';

// ...

export default bar({
  get: getUser,
  post: createUser
});
```

**Tip:** You can define a custom handler for unsupported requests by providing
a `fallback` property when calling `bar()`:

```js
function fallback(req, res) {
  return res.status(405).json({
    ok: false,
    error: `Method ${req.method} is not allowed.`
  });
}

export default bar({
  // ...,
  fallback
});
```

## Supported Methods

The library supports the following methods: GET, POST, PATCH, PUT, DELETE,
OPTIONS.

## License

MIT.
