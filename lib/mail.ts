import nodemailer from "nodemailer";
import * as QRCode from "qrcode";

const THEME = {
    light: {
        bg: "#f8fafc",
        card: "#ffffff",
        text: "#1e293b",
        border: "#e2e8f0",
        muted: "#f1f5f9",
    },
    dark: {
        bg: "#111111",
        card: "#1e293b",
        text: "#f8fafc",
        border: "#334155",
        muted: "#0a0f1e",
    },
    gold: "#7C3AED",
    brandDark: "#111111",
};

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface BookingDetails {
    customerName: string;
    customerEmail: string;
    eventName: string;
    bookingReference: string;
    date: string;
    time: string;
    quantity: number;
    ticketType: string;
    total: number;
}

export const sendBookingConfirmation = async (details: BookingDetails) => {
    const {
        customerName,
        customerEmail,
        eventName,
        bookingReference,
        date,
        time,
        quantity,
        ticketType,
        total,
    } = details;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: ${THEME.light.text}; background-color: ${THEME.light.bg}; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; padding: 0; background-color: ${THEME.light.card}; border: 1px solid ${THEME.light.border}; border-radius: 12px; overflow: hidden; }
        .header { background-color: ${THEME.brandDark}; color: #ffffff; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; color: ${THEME.gold}; font-size: 26px; text-transform: uppercase; letter-spacing: 2px; }
        .content { padding: 30px 20px; }
        .booking-details { background-color: ${THEME.light.muted}; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${THEME.gold}; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #64748b; border-top: 1px solid ${THEME.light.border}; padding: 20px; }
        .gold { color: ${THEME.gold}; font-weight: bold; }
        
        @media (prefers-color-scheme: dark) {
          body { background-color: ${THEME.dark.bg} !important; color: ${THEME.dark.text} !important; }
          .container { background-color: ${THEME.dark.card} !important; border-color: ${THEME.dark.border} !important; }
          .booking-details { background-color: ${THEME.dark.muted} !important; }
          .footer { border-top-color: ${THEME.dark.border} !important; color: #94a3b8 !important; }
          p, li, h3, .content { color: ${THEME.dark.text} !important; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${customerName}</strong>,</p>
          <p>Thank you for booking with <strong>Eventaty</strong>. Your tickets for <strong>${eventName}</strong> have been successfully reserved.</p>
          
          <div class="booking-details">
            <h3 style="margin-top: 0;">Order Summary</h3>
            <p><strong>Booking Reference:</strong> <span class="gold">${bookingReference}</span></p>
            <p><strong>Event:</strong> ${eventName}</p>
            <p><strong>Date & Time:</strong> ${date} at ${time}</p>
            <p><strong>Tickets:</strong> ${quantity} x ${ticketType}</p>
            <div style="margin-top: 20px; text-align: center;">
              <img src="cid:qrCode" alt="Booking QR Code" style="width: 150px; height: 150px; display: block; margin: 0 auto;" />
              <p style="font-size: 10px; color: #777; margin-top: 5px;">Scan for verification</p>
            </div>
            <p><strong>Total Price:</strong> <span class="gold">${total.toFixed(2)} EGP</span></p>
          </div>
          
          <p style="margin-top: 20px;">You can view your tickets anytime by logging into your <a href="http://localhost:3000/dashboard" style="color: #7C3AED;">dashboard</a>.</p>
          <p>We look forward to seeing you at the event!</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 Eventaty. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    try {
        // Generate QR code as Base64 data URL
        const qrCodeDataUrl = await QRCode.toDataURL(bookingReference, {
            margin: 1,
            width: 300,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        });

        const info = await transporter.sendMail({
            from: `"Eventaty" <${process.env.SMTP_USER}>`,
            to: customerEmail,
            subject: `Booking Confirmed: ${eventName}`,
            html: htmlContent,
            attachments: [
                {
                    filename: "qrcode.png",
                    path: qrCodeDataUrl,
                    cid: "qrCode", // same cid value as in the html img src
                },
            ],
        });

        console.log("Email sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};
