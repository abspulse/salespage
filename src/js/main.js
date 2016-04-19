import $ from 'jquery';
import log from './log';

window.$ = window.jQuery = $;

$('form .accounts button').click((e) => {
  e.preventDefault();
  $('form .accounts button').removeClass('active');
  $(e.currentTarget).addClass('active');
});

$('form button[type="submit"]').click((e) => {
  e.preventDefault();
  const payload = {
    account: $('form .accounts button.active').data('account'),
    company: $('form input[name="company"]').val(),
    email: $('form input[name="email"]').val()
  };

  log(payload);
});
