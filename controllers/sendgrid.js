const Sendgrid = require('@sendgrid/mail');
const hb = require('express-handlebars').create();
const sendgridApiKey = require('../keys').SENDGRID_API_KEY || process.env.SENDGRID_API_KEY;
Sendgrid.setApiKey(sendgridApiKey);

module.exports = (function() {

    function sendConfirmationEmail(orderInfo) {
        hb.render('views/email-template.handlebars', orderInfo).then(html => {
            Sendgrid.send({
                to: orderInfo.email,
                from: 'PTADues@gmail.com',
                subject: 'Thank you for your contribution!',
                html: html
            });
        });
    }

    return {
        sendConfirmationEmail: (orderInfo) => sendConfirmationEmail(orderInfo)
    }
    
})();