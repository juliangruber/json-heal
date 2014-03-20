
var heal = require('./');
var equal = require('assert').equal;

describe('heal(json)', function(){
  it('should end keys', function(){
    // object, key
    equal(heal('{"'), '{"...":"..."}')
    equal(heal('{"foo'), '{"foo...":"..."}')
  })
  it('should add strings', function(){
    // object, key 
    equal(heal('{"foo"'), '{"foo":"..."}')
    equal(heal('{"foo":'), '{"foo":"..."}')
  })
  it('should end strings', function(){
    // object, key, string
    equal(heal('{"foo":"'), '{"foo":"..."}')
    equal(heal('{"foo":"bar'), '{"foo":"bar..."}')
    // array, string
    equal(heal('["foo'), '["foo..."]')
  })
  it('should end objects', function(){
    // object
    equal(heal('{'), '{}')
    // object, key, string
    equal(heal('{"foo":"bar"'), '{"foo":"bar"}')
  })
  it('should end arrays', function(){
    // array
    equal(heal('['), '[]')
    // array, string
    equal(heal('["foo"'), '["foo"]')
  })
  it('should end numbers', function(){
    // object, key, number
    equal(heal('{"foo":3'), '{"foo":3}')
    // array, number
    equal(heal('[3'), '[3]')
  });
  it('should end nested keys', function(){
    // object, key, string
    equal(heal('{"foo":{"bar"'), '{"foo":{"bar":"..."}}')
  })
  it('should noop on complete blobs', function(){
    // number
    equal(heal('1'), '1')
    // string
    equal(heal('"foo"'), '"foo"')
    // object, key, string, object end
    equal(heal('{"foo":"bar"}'), '{"foo":"bar"}')
    // array, string, string, array end
    equal(heal('["foo","bar"]'), '["foo","bar"]')
  })
  it('should handle keys after objects', function(){
    // object, key, string, key
    var str = '{"foo":"bar","bar":{"baz":"yes"},"sweet'
    equal(heal(str), '{"foo":"bar","bar":{"baz":"yes"},"sweet...":"..."}')
  })
  it('should handle strings after arrays', function(){
    // array, string, array, string, array end, string
    var str = '["foo",["baz"],"sweet'
    equal(heal(str), '["foo",["baz"],"sweet..."]')
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
  it('should end appropriate number of arrays', function(){
    // array, string, array, string, array end, array, string
    var str = '["foo",["bar"],["yes'
    equal(heal(str), '["foo",["bar"],["yes..."]]')
  })
  it('should handle trailing commas', function(){
    // object, key, string (done)
    var str = '{"foo":"bar",'
    equal(heal(str), '{"foo":"bar","...":"..."}')
    // array, string (done)
    var str = '["foo",'
    equal(heal(str), '["foo","..."]')
    // object, key, boolean (done)
    var str = '{"foo":true,'
    equal(heal(str), '{"foo":true,"...":"..."}')
  })
  it('should handle booleans', function(){
    // boolean
    equal(heal('t'), 'true')
    equal(heal('f'), 'false')
    // object, key, boolean
    equal(heal('{"foo":tru'), '{"foo":true}')
    // object, boolean
    equal(heal('[tru'), '[true]')
  })
  it('should handle null', function(){
    // null
    equal(heal('n'), 'null')
    // object, key, null
    equal(heal('{"foo":nul'), '{"foo":null}')
    // array, null
    equal(heal('[nul'), '[null]')
  })
  it('should handle multi string arrays', function(){
    // array, str, str
    equal(heal('["bar","foo'), '["bar","foo..."]')
  })
  it('should ignore special chars in strings', function(){
    // str
    equal(heal('["fo]",":,{}[]'), '["fo]",":,{}[]..."]')
  })
})

