
/**
 * Expose `Symbol`.
 */

module.exports = function (name) {

  /**
   * Create a new symbol with `name`.
   *
   * @param {String} name
   * @return {Symbol}
   * @api public
   */

  function Symbol(){
    if (!(this instanceof Symbol)) return new Symbol();
    this.body = '';
    this.done = false; // used on some symbols
  }

  /**
   * Inspect implementation.
   */

  Symbol.prototype.inspect = function(){
    return '<Symbol:' + name + ':' + this.body + '>';
  };

  Symbol.prototype.toJSON = function(){
    return this.inspect();
  };

  Symbol.prototype.is = function(Type){
    return this instanceof Type;
  };

  Symbol.prototype.not = function(Type){
    return !(this.is(Type));
  };

  return Symbol;
};


