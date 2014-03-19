
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
  it('should handle keys after objects', function(){
    // object, key, string, key
    var str = '{"foo":"bar","bar":{"baz":"yes"},"sweet'
    equal(heal(str), '{"foo":"bar","bar":{"baz":"yes"},"sweet...":"..."}')
  })
  it('should not end handled keys', function(){
    // object, key, string, key, object, key, string, key
    var str = '{"foo":"bar","beep":{"boop":"yep","nope'
    equal(heal(str), '{"foo":"bar","beep":{"boop":"yep","nope...":"..."}}')
  })
  it('should end appropriate number of objects', function(){
    // object, key, object, key, string, object end, key, object, key, string
    var str = '{"foo":{"bar":"baz"},"beep":{"boop":"yes'
    equal(heal(str), '{"foo":{"bar":"baz"},"beep":{"boop":"yes..."}}')
  })
  it('should handle trailing commas', function(){
    var str = '{"action":"Track",'
    equal(heal(str), '{"action":"Track","...":"..."}')
  })
  it('should handle booleans', function(){
    equal(heal('t'), 'true')
    equal(heal('f'), 'false')
    equal(heal('{"foo":tru'), '{"foo":true}')
  })
})

