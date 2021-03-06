import $ from 'jquery';
// import log from './log';

window.$ = window.jQuery = $;

// Helper
function scrollTo(elem) {
  $('html, body').animate({
    scrollTop: $(elem).offset().top
  }, 400);
}

// Landing full page slide
if ($(window).height() > $('.landing').height() + 109) {
  $('.landing').css('height', $(window).height());
}

// Landing down button
$('.landing .down').click(() => {
  scrollTo('.benefit');
});

// Pricing Select
$('.pricing button').click((e) => {
  const acc = $(e.currentTarget).data('account');
  $('form .accounts button').removeClass('active');
  $(`.reserve .accounts button.${acc}`).addClass('active');
  scrollTo('.reserve');
});

// Signup
const thanksMessage = '<h3>Thank you, we\'ll get back to you soon!</h3>';
const errorMessage = '<h3>Woops, something went wrong, please contact us via: signup@abspulse.com</h3>';

function validateEmail(email) {
  const re = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))/.source
    + /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.source);
  return re.test(email);
}
function validate(elem) {
  function shake() {
    elem.addClass('shake');
    setTimeout(() => {
      elem.removeClass('shake');
    }, 300);
  }
  if (!elem.val()) {
    shake();
    return false;
  } else if (elem.data('type') === 'email' && !validateEmail(elem.val())) {
    shake();
    return false;
  }
  return true;
}

function feedback(template) {
  const html = `<div class="row">
  <div class="col-lg-10 col-lg-offset-1 col-md-8 col-md-offset-2">
    ${template}
  </div>
  </div>`;
  $('section.reserve form').remove();
  $('section.reserve .container').append(html);
}

$('form .accounts button').click((e) => {
  e.preventDefault();
  $('form .accounts button').removeClass('active');
  $(e.currentTarget).addClass('active');
});

$('form button[type="submit"]').click((e) => {
  e.preventDefault();
  const company = $('form input[name="company"]');
  const email = $('form input[name="email"]');

  if (!validate(company) || !validate(email)) {
    return;
  }

  $(e.currentTarget).attr('disabled', 'disabled').text('Sending...');

  const payload = {
    from: `${company.val()} <${email.val()}>`,
    to: 'signup@abspulse.com',
    subject: 'New Pulse Reservation',
    html: `<strong>Signup details:</strong><br/>
    Account: ${$('form .accounts button.active').data('account')}<br/>
    Company: ${company.val()}<br/>
    Email: ${email.val()}`
  };

  $.ajax({
    url: '//email-sender.kriek.io/',
    method: 'post',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(payload)
  }).done((res) => {
    feedback(thanksMessage);
  }).fail((res) => {
    feedback(errorMessage);
  });
});
