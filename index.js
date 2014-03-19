
/**
 * Module dependencies.
 */

var debug = require('debug')('json-heal');
var Symbol = require('./lib/symbol');

/**
 * Expose `heal`.
 */

module.exports = heal;

/**
 * Symbols.
 */

var Obj = Symbol('Object');
var ObjEnd = Symbol('Object End');
var Key = Symbol('Key');
var Str = Symbol('String');
var Num = Symbol('Number');

/**
 * Heal the given string of JSON.
 *
 * @param {String} json
 * @return {String}
 * @api public
 */

function heal(json){
  debug('json: %s', json);
  var stack = [];
  var c;

  function peek(){
    return stack[stack.length - 1];
  }

  for (var i = 0; i < json.length; i++) {
    c = json[i];
    
    if ('{' == c) {
      stack.push(Obj());
    } else if ('}' == c) {
      stack.push(ObjEnd());
    } else if (',' == c && peek().done) {
      continue;
    } else if (!peek() || peek().done && peek().is(Key)) {
      if (/\d/.test(c)) stack.push(Num());
      else stack.push(Str());
    } else if (peek().done && peek().is(Str)) {
      stack.push(Key());
    } else if ('"' == c) {
      if (peek().is(Str)) {
        peek().done = true;
        peek().body += c;
        continue;
      }
      if (peek().is(Key)) {
        if (peek().done) {
          stack.push(Str());
        } else {
          peek().body += c;
          peek().done = true;
          i++;
          continue;
        }
      } else {
        stack.push(Key());
      }
    }
    
    peek().body += c;
  }

  
  if (stack.length) {
    debug('pre stack: %j', stack);

    // Remove finished objects
    var level = 0;
    var start;
    for (var i = stack.length - 1; i >= 0; i--) {
      var symbol = stack[i];
      if (symbol.is(ObjEnd)) {
        if (!start) start = i;
        level++;
      } else if (symbol.is(Obj)) {
        level--;
        if (!level) {
          stack.splice(i, start - i);
          start = null;
        }
      }
    }

    debug('stack: %j', stack);
    var symbol;

    function last(){
      return json[json.length - 1];
    }

    for (var i = stack.length - 1; i >= 0; i--) {
      symbol = stack[i];
      if ('' == symbol.body) continue;

      debug('cur: %s symbol: %j', json, symbol);

      if (symbol.is(Obj)) {
        json += '}';
      }
      
      if (symbol.is(Key) || symbol.is(Str)) {
        if (('"' != last() || '"' == symbol.body) && ':' != last()) json += '..."';
      }

      if (symbol.is(Key)) {
        if (':' != last()) json += ':';
        json += '"..."';
      }

      if (symbol.not(Key)) {
        i--;
      }
    }
  }

  debug('ret: %s', json);
  return json;
}

