const { createBenchmark } = require('../common');

const { Request, TYPES } = require('../../src/tedious');
const RpcRequestPayload = require('../../src/rpcrequest-payload');

const { Readable } = require('readable-stream');

const bench = createBenchmark(main, {
  n: [10, 100],
  size: [10, 100, 1000, 10000]
});

function main({ n, size }) {
  var table = {
    columns: [
      { name: 'user_id', type: TYPES.Int },
      { name: 'user_name', type: TYPES.VarChar, length: 500 },
      { name: 'user_enabled', type: TYPES.Bit }
    ],
    rows: []
  };

  for (let j = 0; j < size; j++) {
    table.rows.push([15, 'Eric', true]);
  }

  const request = new Request('...', () => {});
  request.addParameter('value', TYPES.TVP, table);

  let i = 0;
  bench.start();

  (function cb() {
    if (i++ === n) {
      bench.end(n);
      return;
    }

    const payload = new RpcRequestPayload(request, Buffer.alloc(0), {});
    const stream = Readable.from(payload, { objectMode: false });
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', cb);
  })();
}
