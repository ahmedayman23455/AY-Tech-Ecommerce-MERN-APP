const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Ahmed Ayman <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    /* Here we actually want to have different transports whether we are in production or not  
      production > we want to send real emails  ( Using SendGrid package)  
      Development > we will still use Mailtrap applicaiton
    */

    if (process.env.NODE_ENV === 'production') {
      // sendGrid package
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    // Mailtrap package

    // 1) create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    return transporter;
  }

  async send(template, subject) {
    // 1) Render html based on a pug template
    // Like res.render , we can pass data to the renderFile

    const html = pug.renderFile(
      `${__dirname}/../views/email/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );

    // 2) Define email options
    /* 
      we want to include the text version of our email into the email , some people prefer plain texts than html email template 
      we need a way of converting all the html to simple text ( stripping out all of the html and leaving only the content)

    */
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome To The Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token valid for 10 minutes.',
    );
  }
};
