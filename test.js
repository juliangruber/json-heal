
var heal = require('./');
var equal = require('assert').equal;

describe('heal(json)', function(){
  it('should add braces', function(){
    // object
    equal(heal('{'), '{}')
  })
  it('should end keys', function(){
    // object, key
    equal(heal('{"'), '{"...":"..."}')
    equal(heal('{"foo'), '{"foo...":"..."}')
  })
  it('should add strings', function(){
    // object, key 
    equal(heal('{"foo"'), '{"foo":"..."}')
    equal(heal('{"foo":'), '{"foo":"..."}')
  });
  it('should end strings', function(){
    // object, key, string
    equal(heal('{"foo":"'), '{"foo":"..."}')
    equal(heal('{"foo":"bar'), '{"foo":"bar..."}')
  });
  it('should end objects', function(){
    // object, key, string
    equal(heal('{"foo":"bar"'), '{"foo":"bar"}')
  })
  it('should end numbers', function(){
    // object, key, number
    equal(heal('{"foo":3'), '{"foo":3}')
  });
  it('should end nested keys', function(){
    // object, key, string
    equal(heal('{"foo":{"bar"'), '{"foo":{"bar":"..."}}')
  })
  it('should noop on complete blobs', function(){
    equal(heal('1'), '1')
    equal(heal('"foo"'), '"foo"')
    equal(heal('{"foo":"bar"}'), '{"foo":"bar"}')
  })
})

