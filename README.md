
# json-heal

  Heal a cut off json string to make it parseable again.

  [![build status](https://secure.travis-ci.org/juliangruber/json-heal.svg)](http://travis-ci.org/juliangruber/json-heal)

## Example

```js
var heal = require('json-heal');

heal('{"foo')
// => '{"foo...":"..."}'

heal('{"foo":{"bar":')
// => '{"foo":{"bar":"..."}}'
```

## License

  MIT

