var transpiler = require('es6-module-transpiler');
var Container = transpiler.Container;
var FileResolver = transpiler.FileResolver;
var BundleFormatter = transpiler.formatters.bundle;

var container = new Container({
  resolvers: [new FileResolver(['./../front/app/scripts/components'])],
  formatter: new BundleFormatter()
});

container.getModule('content');
container.write('out/mylib.js');
