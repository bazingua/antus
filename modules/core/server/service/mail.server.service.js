const sendmailModule = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: false,
  devHost: 'localhost'
})

module.exports = {
  sendMail: function (option, done) {
    sendmailModule({
      from: 'no-reply@antus.com',
      to: option.to,
      subject: option.subject,
      html: option.html,
    }, function(err, reply) {
      done(err, reply);
  });
  }
};