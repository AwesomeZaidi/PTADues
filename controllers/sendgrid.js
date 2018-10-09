const Sendgrid = require('@sendgrid/mail');
const hb = require('express-handlebars').create();
Sendgrid.setApiKey(require('../private/sendgridKey'));

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