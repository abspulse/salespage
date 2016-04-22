import { join, normalize } from 'path';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

export const env = argv.prod ? 'prod' : 'dev';
export const isDev = argv.dev;
export const isProd = argv.prod;

export const ROOT_DIR = normalize(join(__dirname, '..'));
export const SRC_DIR = join(ROOT_DIR, 'src');
export const DIST_DIR = 'dist';
export const DEST_DIR = join(ROOT_DIR, DIST_DIR, env);

export const html = {
  src: '.',
  dest: '.',
  glob: '**/*.html',
  cacheName: 'html-task'
};

export const assets = {
  src: '.',
  dest: '.',
  glob: '{favicon.ico,robots.txt,sitemap.xml}',
  cacheName: 'assets-task'
};

export const js = {
  src: 'js',
  dest: 'js',
  fileName: 'main.js',
  bundleName: 'main.js',
  glob: '**/*.js',
  // noParse is an array which will skip all require() and global parsing for each file in the array. Use this for
  // giant libs like jquery or threejs that don't have any requires or node-style globals but take forever to parse.
  // http://stackoverflow.com/a/18543403/1949274
  noParse: [
    require.resolve('jquery'),
    require.resolve('lodash'),
    require.resolve('bootstrap'),
    require.resolve('tether')
  ],
  // extensions is an array of optional extra extensions for the module lookup machinery to use when the extension
  // has not been specified. By default browserify considers only .js and .json files in such cases.
  extensions: []
};

export const css = {
  src: 'css',
  dest: 'css',
  glob: '**/*.scss',
  cacheName: 'css-task',
  // Autoprefixer uses Browserslist, so you can specify the browsers you want to target in your project by queries
  // like last 2 versions or > 5%. For more info check out https://github.com/ai/browserslist#browsers and
  // https://github.com/ai/browserslist#queries
  autoprefixerBrowsers: [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ],
  postCSSAssetsLoadPaths: [
    join(DEST_DIR, 'images'),
    join(DEST_DIR, 'fonts')
  ]
};

export const images = {
  src: '.',
  dest: 'images',
  glob: '**/*.+(png|jpg|jpeg|gif|bmp|svg)',
  cacheName: 'images-task'
};

export const fonts = {
  src: '.',
  dest: 'fonts',
  glob: '**/*.+(eot|ttf|woff|woff2|otf)',
  cacheName: 'fonts-task'
};

export const jsLint = {
  src: '.',
  glob: '**/*.js',
  ignoreGlob: '!**/node_modules/**',
  // Same as `cssLint.ideSupport`. For this you need `eslint` support.
  ideSupport: true,
  cacheName: 'js-lint-task'
};

export const rev = {
  manifestFile: 'rev-manifest.json',
  assets: {
    glob: '**/*',
    ignoreGlob: '**/*.+(html|map)'
  },
  updateReferences: {
    glob: '**/*.+(html|css|js)'
  }
};

export const sizeReport = {
  src: '.',
  glob: '**/*',
  ignoreGlob: '!**/rev-manifest.json'
};

export const watch = {
  // javascript wathing handled in the javascripts task
  watchableTasks: ['html', 'assets', 'fonts', 'images', 'css']
};

export const browserSync = {
  port: argv.port || (isProd ? 8080 : 3000)
};

export const checkVersions = {
  npm: '2.14.2',
  node: '4.0.0'
};

export const prodTasks = [
  'clean',
  [
    'js-lint'
  ],
  'images',
  [
    'html',
    'fonts',
    'css',
    'js'
  ],
  'rev-assets',
  'rev-update-references',
  'assets',
  'size-report'
];

export const devTasks = [
  'clean',
  'images',
  [
    'html',
    'assets',
    'fonts',
    'css',
    'js'
  ],
  'watch'
];
