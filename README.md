
# json-heal

  Heal a trimmed json string.

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

