const { createBenchmark } = require('../common');

const { Parser } = require('../../src/token/token-stream-parser');

const bench = createBenchmark(main, {
  n: [10, 100, 1000],
  tokenCount: [10, 100, 1000, 10000]
});

function main({ n, tokenCount }) {
  const parser = new Parser({ token: function() { } }, {}, {});

  const data = Buffer.from('FE0000E0000000000000000000'.repeat(tokenCount), 'hex');

  bench.start();

  for (let i = 0; i < n; i++) {
    parser.addBuffer(data);
  }

  bench.end(n);
}
