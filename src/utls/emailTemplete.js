export const emailTemplete = (email,userName, token) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Store</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
        .header { font-size: 20px; color: #444; margin-bottom: 20px; }
        .content { margin-top: 20px; }
        .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #aaa; }
        a { color: #1a0dab; }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="header">Welcome to Our Store!</div>
        <div class="content">
            <p>Hi ${userName},</p>
            <p>Thank you for registering at Our Store. We're excited to have you with us!</p>
            <p>You can now enjoy shopping with us and take advantage of member-only offers and updates.</p>
            <p>To get started with your shopping, please visit our store by clicking the button below:</p>
            <p><a href="[Link to Store]" style="background-color: #1283df; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Visit Our Store</a></p>
            <p>If you have any questions, feel free to contact us at <a href = '${process.env.SENDEREMAIL}' style="text-decoration: none;"><b>Our Email</a></b>.</p>
            <p>Welcome aboard,</p>
            <p>Your friends at Our Store</p>
            <a href = 'https://rmshop-nodejs.onrender.com/auth/confirmEmail/${token}' >confirm your email</a>
        </div>
        <div class="footer">
            <p>You received this email because you registered at our website. If you believe this was a mistake, please ignore this email or contact us.</p>
        </div>
    </div>
    </body>
    </html>
    `
}