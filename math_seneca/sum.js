var seneca = require('seneca')();

seneca.add('role:math,cmd:sum', (msg, reply) => {
  reply(null, {answer: (msg.left + msg.right)});
});

seneca.add({role:'math', cmd: 'product'}, (msg, respond) => {
  var product = msg.left * msg.right;
  respond(null, { answer: product});
});

seneca.add({role: 'math', cmd: 'sum', integer: true}, function (msg, respond) {
  // var sum = Math.floor(msg.left) + Math.floor(msg.right);
  // respond(null, {answer: sum});
  this.act({
    role: 'math',
    cmd: 'sum',
    left: Math.floor(msg.left),
    right: Math.floor(msg.right)
  }, respond);
});

seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, (err, result) => {
  if (err) return console.error(err);
  console.log(result);
});

seneca.act({role: 'math', cmd: 'product', left: 3, right: 4}, (err, result) => {
  if (err) return console.error(err);
  console.log(result);
});

seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true}, (err, result) => {
  if (err) return console.error(err);
  console.log(result);
});