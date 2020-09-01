const fs = require('fs');

function math(options) {
  var log;

  this.add('role:math,cmd:sum', sum);
  this.add('role:math,cmd:product', product);

  // This is the special initialization pattern.
  this.add('init:math', init);

  function init(msg, respond) {
    fs.open(options.logfile, 'a', function (err, fd) {
      if (err) return respond(err);

      log = make_log(fd);
      respond();
    });
  }

  function sum(msg, respond) {
    var out = { answer: msg.left + msg.right };

    log('sum'+msg.left+'+'+msg.right+'='+out.answer+'\n');
    respond(null, out);
  }

  function product(msg, respond) {
    var out = { answer: msg.left * msg.right };

    log('sum'+msg.left+'*'+msg.right+'='+out.answer+'\n');
    respond(null, out);
  }

  function make_log(fd) {
    return function (entry) {
      fs.write(fd, new Date().toISOString()+''+entry, null, 'utf8', function (err) {
        if (err) return console.log(err);
        fs.fsync(fd, function (err) {
          if (err) return console.log(err);
        });
      });
    };
  }
}

require('seneca')()
  .use(math, {logfile:'./math.log'})
  .act('role:math,cmd:sum,left:1,right:2', console.log);