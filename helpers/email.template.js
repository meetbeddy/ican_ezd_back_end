module.exports = {
  header: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title></title>
        <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]-->
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
        <!--<![endif]-->
    </head>`,
  register: function (name, email, password) {
    return `
    ${this.header}

<body>
    <div class="es-wrapper-color">
        <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#ffffff"></v:fill>
			</v:background>
		<![endif]-->
        <table class="es-wrapper" style="background-position: center top;" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table class="es-content esd-header-popover" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                        <table style="border-radius: 3px; border-collapse: separate; background-color: #fcfcfc;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-m-txt-l es-p30t es-p20r es-p20l" align="left">
                                                                                        <h2 style="color: #333333;">Welcome!</h2>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-p10t es-p20r es-p20l" bgcolor="#fcfcfc" align="left">
                                                                                        <p>Hi ${name}, you have successfully registered for the up comming ICAN Eastern Conference slated for Tuesday 5th - Friday 8th April, 2022. The Conference Will Now Hold Virtually and Physically.</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p30t es-p20r es-p20l" style="background-color: #fcfcfc;" esd-custom-block-id="15791" bgcolor="#fcfcfc" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                        <table style="border-color: #efefef; border-style: solid; border-width: 1px; border-radius: 3px; border-collapse: separate; background-color: #ffffff;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-p20t es-p15b" align="center">
                                                                                        <h3 style="color: #333333;">Your account information:</h3>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-text" align="center">
                                                                                        <p style="color: #64434a; font-size: 16px; line-height: 150%;">Username: ${email}</p>
                                                                                        <p style="color: #64434a; font-size: 16px; line-height: 150%;">Password: ${password}</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-button es-p20t es-p20b es-p10r es-p10l" align="center"><span class="es-button-border" style="background: #23395d;"><a href="https://www.icanezdconference.org.ng/login" class="es-button" target="_blank" style="background: #23395d; border-color: #23395d; color: #ffffff;">Log In Now</a></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-content-body" style="background-color: #fcfcfc;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p40t es-p25b es-p20r es-p20l" esd-custom-block-id="15790" align="left">
                                                        <!--[if mso]><table width="560" cellpadding="0" 
                            cellspacing="0"><tr><td width="274" valign="top"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p0r es-m-p20b esd-container-frame" width="254" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-text" align="left">
                                                                                        <h3 style="font-size: 17px;">Download the app for ease of operations</h3>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td class="es-hidden" width="20"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="133" valign="top"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p20b esd-container-frame" width="133" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-image" align="center"><a target="_blank" href="https://viewstripo.email/"><img src="https://tlr.stripocdn.email/content/guids/CABINET_e48ed8a1cdc6a86a71047ec89b3eabf6/images/92051534250512328.png" alt="App Store" style="display: block;" class="adapt-img" title="App Store" width="133"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="133" valign="top"><![endif]-->
                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="133" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-image" align="center"><a target="_blank" href="https://viewstripo.email/"><img class="adapt-img" src="https://tlr.stripocdn.email/content/guids/CABINET_e48ed8a1cdc6a86a71047ec89b3eabf6/images/82871534250557673.png" alt="Google Play" style="display: block;" title="Google Play" width="133"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" style="background-color: #666666;" esd-custom-block-id="15624" bgcolor="#666666" align="center">
                                        <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                        <table style="background-color: #fff4f7; border-radius: 3px; border-collapse: separate;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fff4f7">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-spacer es-p5t es-p5b es-p20r es-p20l" bgcolor="#fff4f7" align="center">
                                                                                        <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="border-bottom: 1px solid #fff4f7; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                            <tbody>
                                <tr>
                                <td class="esd-stripe" style="background-color: #666666;" esd-custom-block-id="15625" bgcolor="#666666" align="center">
                                <table class="es-footer-body" style="background-color: #666666;" width="600" cellspacing="0" cellpadding="0" bgcolor="#666666" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left">
                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td esdev-links-color="#999999" class="esd-block-text" align="center">
                                                                                <p style="color: #ffffff;">You are receiving this email because you registered for ICAN Eastern Zonal Conference 2021.</p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td esdev-links-color="#999999" class="esd-block-text es-p5b" align="center">
                                                                                <p style="color: #ffffff;">Wednesday 7th - Thursday 8th October, 2020, Virtually</p>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="esd-footer-popover es-content" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" style="background-color: #666666;" bgcolor="#666666" align="center">
                                        <table class="es-content-body" style="background-color: #666666;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p30t es-p30b es-p20r es-p20l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-image es-infoblock made_with" align="center"><a target="_blank" href="https://www.icanezdconference.org.ng/"><img src="https://i.ibb.co/WFrJD28/logo.png" alt style="display: block; width: 115px; height: 143px;" height="143"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>`;
  },
  sendCert: function (name) {
    return `${this.header}
        <body>
        <div class="es-wrapper-color">
            <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" src="https://stripo.email/content/guids/CABINET_63fbbc11db6741389cc3292b09a63e6d/images/7711511856111535.png" color="#f6f6f6" origin="0.5, 0" position="0.5,0"></v:fill>
                </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" background="https://stripo.email/content/guids/CABINET_63fbbc11db6741389cc3292b09a63e6d/images/7711511856111535.png" style="background-position: center top;">
                <tbody>
                    <tr>
                        <td class="esd-email-paddings" valign="top">
                            <table class="es-content esd-header-popover" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" esd-custom-block-id="4044" align="center">
                                            <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#333333" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure" style="background-color: #f3f3f3;" bgcolor="#f3f3f3" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-p30t es-p15b es-p15r es-p15l" align="center">
                                                                                            <h1 style="font-size: 38px;">THANK YOU FOR ATTENDING</h1>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="esd-block-image es-p15b" align="center" style="font-size:0"><a target="_blank"><img class="adapt-img" src="https://tlr.stripocdn.email/content/guids/CABINET_63fbbc11db6741389cc3292b09a63e6d/images/63541516368770627.png" alt="Handshake" title="Handshake" width="600"></a></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="esd-structure es-p20t es-p10b es-p30r es-p30l" esd-general-paddings-checked="true" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-container-frame" width="540" valign="top" align="center">
                                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-p15t" align="left">
                                                                                            <h3 style="line-height: 120%;">Dear ${name},</h3>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-m-txt-c es-p10t es-p10b" align="left">
                                                                                            <p style="line-height: 150%;">Thank you for attending the 2021 ICAN Eastern ZONAL CONFERENCE.</p>
                                                                                            <p style="color: red; font-style: italic;text-align: center;">
                                                                                              Click Download to Download the IMAGE
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="esd-structure es-p10b es-p30r es-p30l" esd-general-paddings-checked="true" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-container-frame" width="540" valign="top" align="center">
                                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-m-txt-c" align="left">
                                                                                            <h3 style="line-height: 150%;">Below is your certificate of participation:</h3>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="esd-structure es-p20t es-p20b es-p30r es-p30l" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="540" class="esd-container-frame" align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="cid:cert" alt="CERTIFICATE" style="display: block;" width="540"></a></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="esd-structure es-p20t es-p20b es-p30r es-p30l" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="540" class="esd-container-frame" align="center" valign="top">
                                                                            
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0" class="es-footer esd-footer-popover" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" esd-custom-block-id="4061" align="center">
                                            <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p20t es-p20b es-p30r es-p30l" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="540" class="esd-container-frame" align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://www.icanezdconference.org.ng/"><img class="adapt-img" src="https://i.ibb.co/WFrJD28/logo.png" alt style="display: block;" width="72"></a></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
        `;
  },
};
