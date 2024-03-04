const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {CustomError} = require("../../errors");
const emailTemplates = require('../../email-templates');
const {config} = require("../../configs");


module.exports = {
        sendMail: async (userMail = '', emailAction = '', locals = {}) => {

            const templateParser = new EmailTemplates({
                views: {
                    root: path.join(process.cwd(), 'email-templates')
                },
            });

            const templateInfo = emailTemplates[emailAction];

            if (!templateInfo) {
                throw new CustomError('Wrong action name', 500);
            }

            locals.frontendURL = 'localhost:3000';
            // const html = await templateParser.render(templateInfo.template, {userName: 'Alina', frontendURL: 'google.com'});
            const html = await templateParser.render(templateInfo.template, locals);

                    const transporter = nodemailer.createTransport({
                        auth: {
                            user: config.NO_REPLY_EMAIL,
                            pass: config.NO_REPLY_EMAIL_PASSWORD,
                        },
                        service: 'gmail',
                    });

            return transporter.sendMail({
                from: 'No reply',
                to: userMail,
                subject: templateInfo.subject,
                // html: templateInfo.template
                html
            })
        },
};
