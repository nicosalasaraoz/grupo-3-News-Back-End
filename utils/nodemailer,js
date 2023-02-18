const nodemailer = require('nodemailer')

const sendMailer = async(name) => {

   const config = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_GMAIL_APP,
        },
      };

      const message = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Registro exitoso',
        html: `   
                <h1>Hola ${name} Bienvenido a mi pagina oficial</h1>
                <img src="https://play-lh.googleusercontent.com/SK5XKAgwe7rL3JisRwDhf4KqUj7Ngc8-ZXliUjympr928hSgpv8b6lzayv4CuHu3diFn" alt="coca-cola">
                <img src="https://i.pinimg.com/originals/32/23/bb/3223bb4fe635c7ad798b035b6f486e12.gif" alt="coca-cola-gif">       
        `
      }
    try {

     const transport = nodemailer.createTransport(config)
     await transport.sendMail(message)
            
    } catch (error) {
        console.log('error NodeMailer', error)
    }
}

module.exports = sendMailer 