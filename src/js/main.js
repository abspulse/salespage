import $ from 'jquery';
import log from './log';

// You can also require log like this `/asset-pipeline/tasks/js.js:30`
// import log from 'js/log';

window.$ = window.jQuery = $;

// $.get('http://localhost:3000/api/sample', (res) => {
//   console.log('Response from sample api: ', res);
// });

log('Hello there!');
