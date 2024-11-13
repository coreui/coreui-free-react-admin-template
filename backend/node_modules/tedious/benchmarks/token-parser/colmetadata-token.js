const { createBenchmark } = require('../common');

const { Parser } = require('../../src/token/token-stream-parser');

const bench = createBenchmark(main, {
  n: [10, 100, 1000],
  tokenCount: [10, 100, 1000, 10000]
});

function main({ n, tokenCount }) {
  const parser = new Parser({ token: function() { } }, {}, {});

  const data = Buffer.from('810300000000001000380269006400000000000900e7c8000904d00034046e0061006d006500000000000900e7ffff0904d000340b6400650073006300720069007000740069006f006e00'.repeat(tokenCount), 'hex');

  bench.start();

  for (let i = 0; i < n; i++) {
    parser.addBuffer(data);
  }

  bench.end(n);
}
