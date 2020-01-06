class AllowMutateEsmExports {
  apply(compiler) {
    console.log(1111111, 'here');
    throw new Error();
    compiler.hooks.compilation.tap('AllowMutateEsmExports', function(
      compilation
    ) {
      compilation.mainTemplate.hooks.requireExtensions.tap(
        'AllowMutateEsmExports',
        source =>
          source.replace(
            'Object.defineProperty(exports, name, { enumerable: true, get: getter });',
            'Object.defineProperty(exports, name, { configurable: true, enumerable: true, get: getter });'
          )
      );
    });
  }
}

module.exports = AllowMutateEsmExports;
