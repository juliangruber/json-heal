
# json-heal [![build status](https://secure.travis-ci.org/juliangruber/json-heal.svg)](http://travis-ci.org/juliangruber/json-heal)

  Heal a cut off json string to make it parseable again.

## Example

```js
var heal = require('json-heal');

heal('{"foo')
// => '{"foo...":"..."}'

heal('{"foo":{"bar":')
// => '{"foo":{"bar":"..."}}'
```

  You might want to use this in combination with `String#slice` and `JSON.parse` to limit the size of user submitted json data:
  
```js
var input = '{"foo":{"bar":"baz"}}';
var cut = input.slice(0, 5);  // => '{"foo'
var healed = heal(cut);       // => '{"foo...":"..."}'
var obj = JSON.parse(healed); // => {"foo...": "..."}
```

## License

  MIT

