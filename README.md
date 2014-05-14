[![Build Status](https://circleci.com/gh/segmentio/json-heal.png?circle-token=33c6a2acab6c7e042bdc8831dff0174ba60b16ed)](https://circleci.com/gh/segmentio/json-heal)

# json-heal

  Heal a cut off json string to make it parseable again.

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

