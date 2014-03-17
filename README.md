
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

