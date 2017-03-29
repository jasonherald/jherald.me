
var ptr = 0;
var ins = Array();
var tape = 1000000;
var loop = Array();
var start = new Date().getTime() / 1000;
var end;

var ctr = 0;
var out = '';

for (var i = 0; i < tape; i ++) {
  ins[i] = 0;
}

function bf (msg) {
  x = msg.split("");
  for (ctr = 0; ctr < x.length; ctr ++) {
    switch(x[ctr]) {
      case '>': ptr ++; break;
      case '<': ptr --; break;
      case '+': ins[ptr] ++; break;
      case '-': ins[ptr] --; break;
      case '.': out += String.fromCharCode(ins[ptr]); break;
      case ',': ins[ptr] = prompt('Input'); break;
      case '[': if (ins[ptr] != 0) loop.push(ctr); break;
      case ']': if (ins[ptr] == 0) { loop.pop(); } else { ctr = loop[loop.length - 1]; } console.log(loop); break;
    }
    if ((new Date().getTime() / 1000)-start > 5) return 'timeout';
  }

  return out;
}
