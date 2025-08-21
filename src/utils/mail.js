import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'


const sendEmail = async (options) =>
{
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Pro Manager",
            link: "https://promanager.com"
        }
    })


    const emailTextual = mailGenerator.generatePlaintext(options.mailGenContent)
    const emailHtml = mailGenerator.generate(options.mailGenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "mail.promanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }

    try
    {
        await transporter.sendMail(mail)
    } catch (error)
    {
        console.error("Email service failed silently. Make sure that you have provided your MAILTRAP credential in the .env file")
        console.error("Error: ", error)
    }

}

const emailVerificationGenContent =  (username, verificationUrl) =>
{
    return {
        body: {
            name: username,
            intro: "Welcome to the App! we'are excited to have you on board. ",
            action: {
                instruction: "To verify your email please click on the following button.",
                button: {
                    color: "#22BC66",
                    text: "Verify you email",
                    link: verificationUrl
                }
            },
            outro: "Need help, or have question? Just reply to this email, we'd love to help."

        }
    }
}

const forgotPasswordGenContent = function (username, passwordResetUrl)
{
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of your account. ",
            action: {
                instruction: "To reset to your password click on the following button or link.",
                button: {
                    color: "#ae3a1aff",
                    text: "Reset password",
                    link: passwordResetUrl
                }
            },
            outro: "Need help, or have question? Just reply to this email, we'd love to help."

        }
    }
}

export
{
    emailVerificationGenContent,
    forgotPasswordGenContent,
    sendEmail
}