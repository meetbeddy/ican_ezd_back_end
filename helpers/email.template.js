module.exports = {
    header: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>ICAN Eastern Conference</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            body {
                margin: 0;
                padding: 0;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                background-color: #f5f7fa;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 20px;
                text-align: center;
            }
            .header img {
                max-width: 100px;
                height: auto;
            }
            .content {
                padding: 40px 30px;
            }
            .greeting {
                font-size: 24px;
                font-weight: 700;
                color: #1a202c;
                margin-bottom: 16px;
            }
            .text {
                font-size: 16px;
                line-height: 1.6;
                color: #4a5568;
                margin-bottom: 16px;
            }
            .highlight-box {
                background: linear-gradient(135deg, #f6f8fb 0%, #e9ecef 100%);
                border-left: 4px solid #667eea;
                padding: 20px;
                margin: 24px 0;
                border-radius: 8px;
            }
            .discount-banner {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 16px 20px;
                border-radius: 8px;
                margin: 24px 0;
                text-align: center;
            }
            .discount-banner h3 {
                margin: 0 0 8px 0;
                font-size: 20px;
                font-weight: 700;
            }
            .discount-banner p {
                margin: 0;
                font-size: 14px;
                opacity: 0.95;
            }
            .info-card {
                background-color: #ffffff;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 24px;
                margin: 24px 0;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid #e2e8f0;
            }
            .info-row:last-child {
                border-bottom: none;
            }
            .info-label {
                font-weight: 600;
                color: #4a5568;
            }
            .info-value {
                color: #1a202c;
                font-weight: 500;
            }
            .button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #ffffff !important;
                text-decoration: none;
                padding: 16px 32px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                margin: 24px 0;
                box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
                transition: transform 0.2s;
            }
            .button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
            }
            .conference-details {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                padding: 20px;
                border-radius: 8px;
                margin: 24px 0;
                text-align: center;
            }
            .conference-details h4 {
                margin: 0 0 12px 0;
                color: #92400e;
                font-size: 18px;
            }
            .conference-details p {
                margin: 4px 0;
                color: #78350f;
                font-weight: 500;
            }
            .footer {
                background-color: #1a202c;
                color: #a0aec0;
                padding: 32px 30px;
                text-align: center;
                font-size: 14px;
                line-height: 1.6;
            }
            .footer a {
                color: #667eea;
                text-decoration: none;
            }
            .social-links {
                margin: 20px 0;
            }
            .social-links a {
                display: inline-block;
                margin: 0 8px;
                color: #a0aec0;
                text-decoration: none;
            }
            @media only screen and (max-width: 600px) {
                .content {
                    padding: 24px 20px;
                }
                .greeting {
                    font-size: 20px;
                }
                .info-row {
                    flex-direction: column;
                }
                .info-value {
                    margin-top: 4px;
                }
            }
        </style>
    </head>
    <body>`,

    footer: `
        <table class="footer" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center">
                    <img src="https://i.ibb.co/H7VK22v/ICANLogo.jpg" alt="ICAN Logo" style="max-width: 80px; margin-bottom: 16px;">
                    <p style="margin: 12px 0;">Institute of Chartered Accountants of Nigeria</p>
                    <p style="margin: 12px 0;">Eastern Zonal District Conference 2026</p>
                    <p style="margin: 12px 0; font-size: 13px;">
                        You're receiving this email because you registered for the ICAN Eastern Zonal Conference.
                    </p>
                    <div class="social-links">
                        <a href="https://www.icanezdconference.org.ng">Visit Website</a> | 
                        <a href="mailto:info@icanezdconference.org.ng">Contact Us</a>
                    </div>
                    <p style="margin-top: 20px; font-size: 12px; color: #718096;">
                        © 2026 ICAN Eastern Zonal District. All rights reserved.
                    </p>
                </td>
            </tr>
        </table>
    </body>
    </html>`,

    register: function (name, email, password, amount, hasDiscount = false, discountAmount = 0) {
        const originalAmount = hasDiscount ? amount + discountAmount : amount;

        return `
        ${this.header}
        <div class="email-container">
            <div class="header">
                <img src="https://i.ibb.co/H7VK22v/ICANLogo.jpg" alt="ICAN Logo">
                <h1 style="color: white; margin: 16px 0 0 0; font-size: 28px;">Welcome to ICAN 2026!</h1>
            </div>

            <div class="content">
                <h2 class="greeting">🎉 Registration Successful!</h2>
                
                <p class="text">
                    Hi <strong>${name}</strong>,
                </p>
                
                <p class="text">
                    Congratulations! You've successfully registered for the <strong>ICAN Eastern Zonal Conference 2026</strong>. 
                    We're excited to have you join us for this transformative experience.
                </p>

                ${hasDiscount ? `
                <div class="discount-banner">
                    <h3>🎁 Early Bird Discount Applied!</h3>
                    <p>You saved ₦${discountAmount.toLocaleString()} by registering early</p>
                </div>
                ` : ''}

                <div class="conference-details">
                    <h4>📅 Conference Details</h4>
                    <p><strong>Date:</strong> Tuesday 1st - Friday 4th April, 2026</p>
                    <p><strong>Mode:</strong> Virtual & Physical Attendance Available</p>
                    <p><strong>Theme:</strong> Innovation & Excellence in Accounting</p>
                </div>

                <div class="info-card">
                    <h3 style="margin-top: 0; color: #1a202c; font-size: 18px;">🔐 Your Login Credentials</h3>
                    <div class="info-row">
                        <span class="info-label">Username:</span>
                        <span class="info-value">${email}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Password:</span>
                        <span class="info-value">${password}</span>
                    </div>
                    ${hasDiscount ? `
                    <div class="info-row">
                        <span class="info-label">Original Price:</span>
                        <span class="info-value" style="text-decoration: line-through; color: #718096;">₦${originalAmount.toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Discount (5%):</span>
                        <span class="info-value" style="color: #10b981;">-₦${discountAmount.toLocaleString()}</span>
                    </div>
                    ` : ''}
                    <div class="info-row">
                        <span class="info-label">${hasDiscount ? 'Final Amount:' : 'Amount Paid:'}</span>
                        <span class="info-value" style="color: #667eea; font-size: 18px;">₦${amount.toLocaleString()}</span>
                    </div>
                </div>

                <div style="text-align: center;">
                    <a href="https://www.icanezdconference.org.ng/login" class="button">
                        Access Your Account
                    </a>
                </div>

                <div class="highlight-box">
                    <h4 style="margin-top: 0; color: #1a202c;">📱 Download Our Mobile App</h4>
                    <p style="color: #4a5568; margin-bottom: 12px;">
                        Get the best conference experience with our mobile app. Access schedules, network with attendees, and stay updated.
                    </p>
                    <div style="display: flex; gap: 12px; justify-content: center; margin-top: 16px;">
                        <a href="#" style="display: inline-block;">
                            <img src="https://tlr.stripocdn.email/content/guids/CABINET_e48ed8a1cdc6a86a71047ec89b3eabf6/images/92051534250512328.png" 
                                 alt="App Store" style="height: 40px;">
                        </a>
                        <a href="#" style="display: inline-block;">
                            <img src="https://tlr.stripocdn.email/content/guids/CABINET_e48ed8a1cdc6a86a71047ec89b3eabf6/images/82871534250557673.png" 
                                 alt="Google Play" style="height: 40px;">
                        </a>
                    </div>
                </div>

                <p class="text">
                    If you have any questions or need assistance, please don't hesitate to reach out to our support team.
                </p>

                <p class="text">
                    We look forward to seeing you at the conference!
                </p>

                <p class="text" style="margin-top: 32px;">
                    <strong>Best regards,</strong><br>
                    ICAN Eastern Zonal Conference Team
                </p>
            </div>

            ${this.footer}
        </div>`;
    },

    forgotPassword: function (name, email, link) {
        return `
        ${this.header}
        <div class="email-container">
            <div class="header">
                <img src="https://i.ibb.co/H7VK22v/ICANLogo.jpg" alt="ICAN Logo">
                <h1 style="color: white; margin: 16px 0 0 0; font-size: 28px;">Password Reset</h1>
            </div>

            <div class="content">
                <h2 class="greeting">🔐 Reset Your Password</h2>
                
                <p class="text">
                    Hi <strong>${name}</strong>,
                </p>
                
                <p class="text">
                    We received a request to reset your password for your ICAN Conference account. 
                    If you didn't make this request, you can safely ignore this email.
                </p>

                <div class="highlight-box">
                    <h4 style="margin-top: 0; color: #1a202c;">⏰ Quick Action Required</h4>
                    <p style="color: #4a5568; margin: 0;">
                        This password reset link will expire in <strong>1 hour</strong> for security reasons.
                    </p>
                </div>

                <div style="text-align: center;">
                    <a href="${link}" class="button">
                        Reset Your Password
                    </a>
                </div>

                <p class="text" style="font-size: 14px; color: #718096;">
                    If the button doesn't work, copy and paste this link into your browser:<br>
                    <a href="${link}" style="color: #667eea; word-break: break-all;">${link}</a>
                </p>

                <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px; margin: 24px 0;">
                    <p style="margin: 0; color: #991b1b; font-size: 14px;">
                        <strong>⚠️ Security Tip:</strong> Never share your password with anyone. ICANEZD will never ask for your password via email.
                    </p>
                </div>

                <p class="text">
                    If you continue to have issues accessing your account, please contact our support team for assistance.
                </p>

                <p class="text" style="margin-top: 32px;">
                    <strong>Best regards,</strong><br>
                    ICAN Eastern Zonal Conference Team
                </p>
            </div>

            ${this.footer}
        </div>`;
    },

    sendReceipt: function (name, mode, invoiceData, hasDiscount = false, discountAmount = 0) {
        const originalAmount = hasDiscount ? invoiceData.amount + discountAmount : invoiceData.amount;

        return `
        ${this.header}
        <div class="email-container">
            <div class="header">
                <img src="https://i.ibb.co/H7VK22v/ICANLogo.jpg" alt="ICAN Logo">
                <h1 style="color: white; margin: 16px 0 0 0; font-size: 28px;">Payment Receipt</h1>
            </div>

            <div class="content">
                <h2 class="greeting">✅ Payment Confirmed</h2>
                
                <p class="text">
                    Dear <strong>${name}</strong>,
                </p>
                
                <p class="text">
                    Thank you for your payment! Your registration for the ICAN Eastern Zonal Conference 2026 is now complete.
                </p>

                ${hasDiscount ? `
                <div class="discount-banner">
                    <h3>🎁 Early Bird Discount Applied</h3>
                    <p>You saved ₦${discountAmount.toLocaleString()} by registering before December 31st</p>
                </div>
                ` : ''}

                <div class="info-card">
                    <h3 style="margin-top: 0; color: #1a202c; font-size: 18px;">💳 Transaction Details</h3>
                    <div class="info-row">
                        <span class="info-label">Invoice Number:</span>
                        <span class="info-value">${invoiceData.invoiceId}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">ICAN Code:</span>
                        <span class="info-value">${invoiceData.code}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Payment Date:</span>
                        <span class="info-value">${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}</span>
                    </div>
                    ${hasDiscount ? `
                    <div class="info-row">
                        <span class="info-label">Original Amount:</span>
                        <span class="info-value" style="text-decoration: line-through; color: #718096;">₦${originalAmount.toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Discount (5%):</span>
                        <span class="info-value" style="color: #10b981;">-₦${discountAmount.toLocaleString()}</span>
                    </div>
                    ` : ''}
                    <div class="info-row" style="background-color: #f7fafc; margin: 12px -24px -24px -24px; padding: 16px 24px; border-radius: 0 0 12px 12px;">
                        <span class="info-label" style="font-size: 18px;">Amount Paid:</span>
                        <span class="info-value" style="font-size: 24px; color: #667eea;">₦${invoiceData.amount.toLocaleString()}</span>
                    </div>
                </div>

                <div class="conference-details">
                    <h4>📅 Your Conference Registration</h4>
                    <p><strong>Date:</strong> Tuesday 1st - Friday 4th April, 2026</p>
                    <p><strong>Attendance Mode:</strong> ${mode}</p>
                    <p><strong>Status:</strong> <span style="color: #059669; font-weight: 700;">CONFIRMED ✓</span></p>
                </div>

                <div class="highlight-box">
                    <h4 style="margin-top: 0; color: #1a202c;">📄 Important Information</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #4a5568;">
                        <li>Please keep this receipt for your records</li>
                        <li>Your conference badge will be available for pickup at registration</li>
                        <li>Check your email for pre-conference materials and schedule</li>
                        <li>Download the mobile app for real-time updates</li>
                    </ul>
                </div>

                <div style="text-align: center;">
                    <a href="https://www.icanezdconference.org.ng/login" class="button">
                        View Your Dashboard
                    </a>
                </div>

                <p class="text">
                    We're excited to have you join us! If you have any questions about your registration or the conference, 
                    please don't hesitate to contact our support team.
                </p>

                <p class="text" style="margin-top: 32px;">
                    <strong>See you at the conference!</strong><br>
                    ICAN Eastern Zonal Conference Team
                </p>
            </div>

            ${this.footer}
        </div>`;
    },

    sendCert: function (name) {
        return `
        ${this.header}
        <div class="email-container">
            <div class="header">
                <img src="https://i.ibb.co/H7VK22v/ICANLogo.jpg" alt="ICAN Logo">
                <h1 style="color: white; margin: 16px 0 0 0; font-size: 28px;">Certificate of Participation</h1>
            </div>

            <div class="content">
                <h2 class="greeting">🎓 Congratulations!</h2>
                
                <p class="text">
                    Dear <strong>${name}</strong>,
                </p>
                
                <p class="text">
                    Thank you for your active participation in the <strong>ICAN Eastern Zonal Conference 2026</strong>. 
                    Your engagement and contribution made the conference a tremendous success!
                </p>

                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0;">
                    <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 20px;">
                        🏆 Certificate Attached
                    </h3>
                    <p style="margin: 0; color: #78350f; font-size: 16px;">
                        Your official Certificate of Participation is attached to this email
                    </p>
                </div>

                <div style="background-color: #ffffff; border: 2px dashed #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
                    <img src="cid:cert" alt="Certificate" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                </div>

                <div class="highlight-box">
                    <h4 style="margin-top: 0; color: #1a202c;">📥 Download Instructions</h4>
                    <p style="color: #4a5568; margin: 0;">
                        Click the <strong>Download</strong> button or attachment icon in your email to save the certificate image. 
                        You can print it or keep it digitally for your professional records.
                    </p>
                </div>



                <p class="text">
                    We hope you found the conference valuable and enriching. Your feedback is important to us, 
                    and we'd love to hear about your experience.
                </p>

                <div style="text-align: center;">
                    <a href="https://www.icanezdconference.org.ng/feedback" class="button">
                        Share Your Feedback
                    </a>
                </div>

                <p class="text" style="margin-top: 32px;">
                    Once again, congratulations on completing the ICAN Eastern Zonal Conference 2026!
                </p>

                <p class="text">
                    <strong>Best wishes for your continued success,</strong><br>
                    ICAN Eastern Zonal Conference Team
                </p>
            </div>

            ${this.footer}
        </div>`;
    },

    invoice: function (name, email, rrr, amount, hasDiscount = false, discountAmount = 0) {
        const originalAmount = hasDiscount ? amount + discountAmount : amount;
        const paymentLink = `https://www.icanezdconference.org.ng/payment?rrr=${rrr}`;

        return `
        ${this.header}
        <div class="email-container">
            <div class="header">
                <img src="https://i.ibb.co/H7VK22v/ICANLogo.jpg" alt="ICAN Logo">
                <h1 style="color: white; margin: 16px 0 0 0; font-size: 28px;">Payment Invoice</h1>
            </div>

            <div class="content">
                <h2 class="greeting">📋 Your Registration is Pending</h2>
                
                <p class="text">
                    Hi <strong>${name}</strong>,
                </p>
                
                <p class="text">
                    Thank you for registering for the <strong>ICAN Eastern Zonal Conference 2026</strong>. 
                    Your registration details have been received, but your account is currently <strong>PENDING</strong> payment.
                </p>

                <div class="highlight-box" style="border-left-color: #f59e0b;">
                    <h4 style="margin-top: 0; color: #1a202c;">⚠️ Action Required</h4>
                    <p style="color: #4a5568; margin: 0;">
                        To fully activate your registration and receive your conference materials, please complete your payment using the details below.
                    </p>
                </div>

                <div class="info-card">
                    <h3 style="margin-top: 0; color: #1a202c; font-size: 18px;">💳 Payment Information</h3>
                    <div class="info-row">
                        <span class="info-label">RRR Number:</span>
                        <span class="info-value"><strong style="color: #667eea; font-size: 20px;">${rrr}</strong></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Amount to Pay:</span>
                        <span class="info-value" style="color: #1a202c; font-size: 18px;">₦${amount.toLocaleString()}</span>
                    </div>
                    ${hasDiscount ? `
                    <div class="info-row">
                        <span class="info-label">Included Discount:</span>
                        <span class="info-value" style="color: #10b981;">₦${discountAmount.toLocaleString()} (Early Bird)</span>
                    </div>
                    ` : ''}
                </div>

                <div class="conference-details">
                    <h4>How to Complete Your Payment:</h4>
                    <div style="text-align: left; margin-bottom: 20px;">
                        <p><strong>Option 1: Pay Online Now</strong></p>
                        <p style="font-size: 14px; margin-bottom: 15px;">Click the button below to pay using your card or bank transfer on our secure payment page.</p>
                        
                        <p><strong>Option 2: Pay at any Bank</strong></p>
                        <p style="font-size: 14px;">Visit any bank branch in Nigeria, provide the RRR <strong>${rrr}</strong>, and pay exactly <strong>₦${amount.toLocaleString()}</strong>.</p>
                    </div>
                </div>

                <div style="text-align: center;">
                    <a href="${paymentLink}" class="button">
                        Complete Payment Online
                    </a>
                </div>

                <p class="text" style="font-size: 14px; color: #718096; text-align: center;">
                    After payment, your registration will be automatically confirmed within minutes.
                </p>

                <p class="text" style="margin-top: 32px;">
                    <strong>Best regards,</strong><br>
                    ICAN Eastern Zonal Conference Team
                </p>
            </div>

            ${this.footer}
        </div>`;
    }
};