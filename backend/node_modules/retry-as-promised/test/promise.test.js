var chai = require('chai'),
  expect = chai.expect,
  moment = require('moment'),
  sinon = require('sinon');

var delay = ms => new Promise(_ => setTimeout(_, ms));

chai.use(require('chai-as-promised'));
sinon.usingPromise(Promise);

describe('Global Promise', function() {
  var retry = require('../').default;

  beforeEach(function() {
    this.count = 0;
    this.soRejected = new Error(Math.random().toString());
    this.soResolved = new Error(Math.random().toString());
  });

  it('should reject immediately if max is 1 (using options)', function() {
    var callback = sinon.stub();

    callback.resolves(this.soResolved);
    callback.onCall(0).rejects(this.soRejected);

    return expect(retry(callback, { max: 1, backoffBase: 0 }))
      .to.eventually.be.rejectedWith(this.soRejected)
      .then(function() {
        expect(callback.callCount).to.equal(1);
      });
  });

  it('should reject immediately if max is 1 (using integer)', function() {
    var callback = sinon.stub();

    callback.resolves(this.soResolved);
    callback.onCall(0).rejects(this.soRejected);

    return expect(retry(callback, 1))
      .to.eventually.be.rejectedWith(this.soRejected)
      .then(function() {
        expect(callback.callCount).to.equal(1);
      });
  });

  it('should reject after all tries if still rejected', function() {
    var callback = sinon.stub();

    callback.rejects(this.soRejected);

    return expect(retry(callback, { max: 3, backoffBase: 0 }))
      .to.eventually.be.rejectedWith(this.soRejected)
      .then(function() {
        expect(callback.firstCall.args).to.deep.equal([{ current: 1 }]);
        expect(callback.secondCall.args).to.deep.equal([{ current: 2 }]);
        expect(callback.thirdCall.args).to.deep.equal([{ current: 3 }]);
        expect(callback.callCount).to.equal(3);
      });
  });

  it('should resolve immediately if resolved on first try', function() {
    var callback = sinon.stub();

    callback.resolves(this.soResolved);
    callback.onCall(0).resolves(this.soResolved);

    return expect(retry(callback, { max: 10, backoffBase: 0 }))
      .to.eventually.equal(this.soResolved)
      .then(function() {
        expect(callback.callCount).to.equal(1);
      });
  });

  it('should resolve if resolved before hitting max', function() {
    var callback = sinon.stub();

    callback.rejects(this.soRejected);
    callback.onCall(3).resolves(this.soResolved);

    return expect(retry(callback, { max: 10, backoffBase: 0 }))
      .to.eventually.equal(this.soResolved)
      .then(function() {
        expect(callback.firstCall.args).to.deep.equal([{ current: 1 }]);
        expect(callback.secondCall.args).to.deep.equal([{ current: 2 }]);
        expect(callback.thirdCall.args).to.deep.equal([{ current: 3 }]);
        expect(callback.callCount).to.equal(4);
      });
  });

  describe('options.timeout', function() {
    it('should throw if reject on first attempt', function() {
      return expect(
        retry(
          function() {
            return delay(2000);
          },
          {
            max: 1,
            backoffBase: 0,
            timeout: 1000
          }
        )
      ).to.eventually.be.rejectedWith(retry.TimeoutError);
    });

    it('should throw if reject on last attempt', function() {
      return expect(
        retry(
          function() {
            this.count++;
            if (this.count === 3) {
              return delay(3500);
            }
            return Promise.reject();
          }.bind(this),
          {
            max: 3,
            backoffBase: 0,
            timeout: 1500
          }
        )
      )
        .to.eventually.be.rejectedWith(retry.TimeoutError)
        .then(function() {
          expect(this.count).to.equal(3);
        }.bind(this));
    });
  });

  describe('options.match', function() {
    it('should continue retry while error is equal to match string', function() {
      var callback = sinon.stub();

      callback.rejects(this.soRejected);
      callback.onCall(3).resolves(this.soResolved);

      return expect(
        retry(callback, {
          max: 15,
          backoffBase: 0,
          match: 'Error: ' + this.soRejected.message
        })
      )
        .to.eventually.equal(this.soResolved)
        .then(function() {
          expect(callback.callCount).to.equal(4);
        });
    });

    it('should reject immediately if error is not equal to match string', function() {
      var callback = sinon.stub();

      callback.rejects(this.soRejected);

      return expect(
        retry(callback, {
          max: 15,
          backoffBase: 0,
          match: 'A custom error string'
        })
      )
        .to.eventually.be.rejectedWith(this.soRejected)
        .then(function() {
          expect(callback.callCount).to.equal(1);
        });
    });

    it('should continue retry while error is instanceof match', function() {
      var callback = sinon.stub();

      callback.rejects(this.soRejected);
      callback.onCall(4).resolves(this.soResolved);

      return expect(retry(callback, { max: 15, backoffBase: 0, match: Error }))
        .to.eventually.equal(this.soResolved)
        .then(function() {
          expect(callback.callCount).to.equal(5);
        });
    });

    it('should reject immediately if error is not instanceof match', function() {
      var callback = sinon.stub();

      callback.rejects(this.soRejected);

      return expect(
        retry(callback, { max: 15, backoffBase: 0, match: function foo() {} })
      )
        .to.eventually.be.rejectedWith(Error)
        .then(function() {
          expect(callback.callCount).to.equal(1);
        });
    });

    it('should continue retry while error is equal to match string in array', function() {
      var callback = sinon.stub();

      callback.rejects(this.soRejected);
      callback.onCall(4).resolves(this.soResolved);

      return expect(
        retry(callback, {
          max: 15,
          backoffBase: 0,
          match: [
            'Error: ' + (this.soRejected.message + 1),
            'Error: ' + this.soRejected.message
          ]
        })
      )
        .to.eventually.equal(this.soResolved)
        .then(function() {
          expect(callback.callCount).to.equal(5);
        });
    });

    it('should reject immediately if error is not equal to match string in array', function() {
      var callback = sinon.stub();

      callback.rejects(this.soRejected);

      return expect(
        retry(callback, {
          max: 15,
          backoffBase: 0,
          match: [
            'Error: ' + (this.soRejected + 1),
            'Error: ' + (this.soRejected + 2)
          ]
        })
      )
        .to.eventually.be.rejectedWith(Error)
        .then(function() {
          expect(callback.callCount).to.equal(1);
        });
    });

    it('should reject immediately if error is not instanceof match in array', function() {
      var callback = sinon.stub();

      callback.rejects(this.soRejected);

      return expect(
        retry(callback, {
          max: 15,
          backoffBase: 0,
          match: ['Error: ' + (this.soRejected + 1), function foo() {}]
        })
      )
        .to.eventually.be.rejectedWith(Error)
        .then(function() {
          expect(callback.callCount).to.equal(1);
        });
    });

    it('should continue retry while error is instanceof match in array', function() {
      var callback = sinon.stub();

      callback.rejects(this.soRejected);
      callback.onCall(4).resolves(this.soResolved);

      return expect(
        retry(callback, {
          max: 15,
          backoffBase: 0,
          match: ['Error: ' + (this.soRejected + 1), Error]
        })
      )
        .to.eventually.equal(this.soResolved)
        .then(function() {
          expect(callback.callCount).to.equal(5);
        });
    });

    it('should continue retry while error is matched by function', function() {
      var callback = sinon.stub();

      callback.rejects(this.soRejected);
      callback.onCall(4).resolves(this.soResolved);

      return expect(
        retry(callback, {
          max: 15,
          backoffBase: 0,
          match: (err) => err instanceof Error
        })
      )
        .to.eventually.equal(this.soResolved)
        .then(function() {
          expect(callback.callCount).to.equal(5);
        });
    });

    it('should continue retry while error is matched by a function in array', function() {
      var callback = sinon.stub();

      callback.rejects(this.soRejected);
      callback.onCall(4).resolves(this.soResolved);

      return expect(
        retry(callback, {
          max: 15,
          backoffBase: 0,
          match: [
            (err) => err instanceof Error
          ]
        })
      )
        .to.eventually.equal(this.soResolved)
        .then(function() {
          expect(callback.callCount).to.equal(5);
        });
    });
});

  describe('options.backoff', function() {
    it('should resolve after 5 retries and an eventual delay over 611ms using default backoff', async function() {
      // Given
      var callback = sinon.stub();
      callback.rejects(this.soRejected);
      callback.onCall(5).resolves(this.soResolved);

      // When
      var startTime = moment();
      const result = await retry(callback, { max: 15 });
      var endTime = moment();

      // Then
      expect(result).to.equal(this.soResolved);
      expect(callback.callCount).to.equal(6);
      expect(endTime.diff(startTime)).to.be.within(600, 650);
    });

    it('should resolve after 1 retry and initial delay equal to the backoffBase', async function() {
      var initialDelay = 100;
      var callback = sinon.stub();

      callback.onCall(0).rejects(this.soRejected);
      callback.onCall(1).resolves(this.soResolved);

      var startTime = moment();
      const result = await retry(callback, {
          max: 2,
          backoffBase: initialDelay,
          backoffExponent: 3
        });
      var endTime = moment();

      expect(result).to.equal(this.soResolved);
      expect(callback.callCount).to.equal(2);
      // allow for some overhead
      expect(endTime.diff(startTime)).to.be.within(initialDelay, initialDelay + 50);
    });

    it('should throw TimeoutError and cancel backoff delay if timeout is reached', function() {
      return expect(
        retry(
          function() {
            return delay(2000);
          },
          {
            max: 15,
            timeout: 1000
          }
        )
      ).to.eventually.be.rejectedWith(retry.TimeoutError);
    });
  });

  describe('options.report', function() {
    it('should receive the error that triggered a retry', function() {
      var report = sinon.stub();
      var callback = sinon.stub();

      callback.rejects(this.soRejected);
      callback.onCall(1).resolves(this.soResolved);

      return expect(
        retry(callback, {max: 3, report})
      )
        .to.eventually.equal(this.soResolved)
        .then(function() {
          expect(callback.callCount).to.equal(2);

          // messages sent to report are:
          // Trying functionStub #1 at <timestamp>
          // Error: <random number>                 <--- This is the report call we want to test
          // Retrying functionStub (2)
          // Delaying retry of functionStub by 100
          // Trying functionStub #2 at <timestamp>
          expect(report.callCount).to.equal(5);
          expect(report.getCall(1).args[2]).to.be.instanceOf(Error);
        });
    });

    it('should receive the error that exceeded max', function() {
      var report = sinon.stub();
      var callback = sinon.stub();

      callback.rejects(this.soRejected);

      return expect(
        retry(callback, {max: 3, report})
      )
        .to.eventually.be.rejectedWith(Error)
        .then(function() {
          expect(callback.callCount).to.equal(3);

          // Trying functionStub #1 at <timestamp>
          // Error: <random number>
          // Retrying functionStub (2)
          // Delaying retry of functionStub by 100
          // Trying functionStub #2 at <timestamp>
          // Error: <random number>
          // Retrying functionStub (3)
          // Delaying retry of functionStub by 110.00000000000001
          // Trying functionStub #3 at <timestamp>
          // Error: <random number>                 <--- This is the report call we want to test
          expect(report.callCount).to.equal(10);
          expect(report.lastCall.args[2]).to.be.instanceOf(Error);
        });
    });

  });
});
