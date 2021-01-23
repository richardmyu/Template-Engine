const njk = require('nunjucks');

// renderString
// njk.configure({ autoescape: true });
// console.log(njk.renderString('Hello {{username}}', { username: 'yu' }));

function createEnv(path, opts) {
  const autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefine || false,
    env = new njk.Environment(
      new njk.FileSystemLoader(path, {
        noCache: noCache,
        watch: watch
      }), {
      autoescape: autoescape,
      throwOnUndefined: throwOnUndefined
    });

  if (opts.filters) {
    for (const f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }

  return env;
}

const env = createEnv('view', {
  watch: true,
  filters: {
    // 自定义过滤器
    hex: function (n) {
      return '0x' + n.toString(16);
    },
    replace: function (str, target, source) {
      return str.replace(target, source);
    },
    capitalize: function (str) {
      return str.replace(str[0], str[0].toUpperCase());
    }
  }
});

const s = env.render('hello.html', {
  nama: '<Njk>',
  fruits: ['Apple', 'Pear', 'Banana'],
  count: 12000
});

// console.log('---------');
// console.log(s);
// console.log('---------');

console.log(env.render('extend.html', {
  header: 'Hello',
  body: 'bal bal bal',
  obj: {
    '小明': 18,
    '小红': 17
  },
  points: [[0, 1, 2], [5, 6, 7], [12, 13, 14]],
  deeppoints: [[[0], [1], [2]], [[5], [6], [7]], [[12], [13], [14]]]
}));
