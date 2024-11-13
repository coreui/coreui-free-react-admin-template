# Sequelize Pool

[![npm](https://img.shields.io/npm/v/sequelize-pool.svg?style=flat-square)](https://www.npmjs.com/package/sequelize-pool)
[![Actions Status](https://github.com/sequelize/sequelize-pool/workflows/CI/badge.svg)](https://github.com/sequelize/sequelize-pool/actions)

Resource pool implementation. It can be used to throttle expensive resources.

**Note:**
This is a fork from [generic-pool@v2.5](https://github.com/coopernurse/node-pool/tree/v2.5).

## Installation

```sh
npm i sequelize-pool
```

## API Documentation

You can find full API documentation in [docs/README.md](docs/README.md)

## Example

### Step 1 - Create pool using a factory object

```js
// Create a MySQL connection pool
var Pool = require('sequelize-pool').Pool;
var mysql2 = require('mysql2/promise');

var pool = new Pool({
  name: 'mysql',
  create: async () => {
    // create a new connection
    // return as a promise
    return mysql2.createConnection({
      user: 'scott',
      password: 'tiger',
      database: 'mydb',
    });
  },
  destroy: (connection) => {
    // this function should destroy connection. Pool waits for promise (if returned).
    // connection is removed from pool and this method is called and awaited for.
    connection.end();
  },
  validate: (connection) => connection.closed !== true,
  max: 5,
  min: 0,
});
```

### Step 2 - Use pool in your code to acquire/release resources

```js
// acquire connection
(async () => {
  // Get new connection from pool.
  // This method can throw TimeoutError if connection was not created in
  // specified `factory.acquireTimeoutMillis` time.
  const connection = await pool.acquire();

  const result = connection.query('select * from foo');

  // return connection back to pool so it can be reused
  pool.release(connection);
})();
```

### Step 3 - Drain pool during shutdown (optional)

If you are shutting down a long-lived process, you may notice
that node fails to exit for 30 seconds or so. This is a side
effect of the `idleTimeoutMillis` behaviour -- the pool has a
`setTimeout()` call registered that is in the event loop queue, so
node won't terminate until all resources have timed out, and the pool
stops trying to manage them.

This behavior will be more problematic when you set `factory.min > 0`,
as the pool will never become empty, and the `setTimeout` calls will
never end.

In these cases, use the `pool.drain()` function. This sets the pool
into a "draining" state which will gracefully wait until all
idle resources have timed out. For example, you can call:

```js
// Only call this once in your application -- at the point you want
// to shutdown and stop using this pool.
pool.drain().then(() => pool.destroyAllNow());
```

If you do this, your node process will exit gracefully.

## Draining

If you know would like to terminate all the resources in your pool before
their timeouts have been reached, you can use `destroyAllNow()` in conjunction
with `drain()`:

```js
pool.drain().then(() => pool.destroyAllNow());
```

One side-effect of calling `drain()` is that subsequent calls to `acquire()`
will throw an Error.

## Using `maxUses` option

Imagine a scenario where you have 10 app servers (hosting an API) that each connect to a read-replica set of 3 members, accessible behind a DNS name that round-robins IPs for the 3 replicas. Each app server rus a connection pool of 25 connections.

You start your app servers with an ambient traffic load of 50 http requests per second, and the connection pools likely fill up in a minute or two. Everything is great at this point.

But when you hit weekly traffic peaks, you might reach up to 1,000 http requests per second. If you have a DB with elastic read replicas, you might quickly add 10 more read replicas during this peak time and scale them back down during slower times of the week in order to reduce cost and avoid the additional replication lag you might see with larger numbers or read replicas.

When you add these 10 read replicas, assuming the first 3 remain healthy, the connection pool with not inherently adopt these new replicas because the pools are full and the connections are healthy, so connections are continuously reused with no need to create new ones. Some level of intervention is needed to fill the connection pool with connections that are balanced between all the replicas.

If you set the `maxUses` configuration option, the pool will proactively retire a resource (connection) once it has been acquired and released `maxUses` number of times, which over a period of time will eventually lead to a relatively balanced pool.

One way to calculate a reasonable value for `maxUses` is to identify an acceptable window for rebalancing and then solve for `maxUses`:

```sh
   maxUses = rebalanceWindowSeconds * totalRequestsPerSecond / numAppInstances / poolSize
```

In the example above, assuming we acquire and release 1 connection per request and we are aiming for a 30 minute rebalancing window:

```sh
    maxUses = rebalanceWindowSeconds * totalRequestsPerSecond / numAppInstances / poolSize
       7200 =        1800            *          1000          /        10       /    25
```

...in other words we would retire and replace a connection after every 7200 uses, which we expect to be around 30 minutes under peak load.

Of course, you'll want to test scenarios for your own application since every app and every traffic pattern is different.

## Contributing

We use [Node Tap](https://node-tap.org/) for testing.

```sh
npm install
npm test
```

Documentation is generated with `typedoc`

```sh
npm run docs
```
