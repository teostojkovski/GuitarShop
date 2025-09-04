import React from 'react'
import '../styles/Footer.css'
import logo from "../assets/logo.png";
import socials from "../assets/socials.png";
import mail from "../assets/mail.png";
import location from "../assets/location.png";

const Footer = () => {
    return (
        <footer className="footerSection">
            <div className="footerContent">
                <div className="footerBrand">
                    <div className="footerLogo">
                        <img src={logo} alt="VibeStrings" className="footerLogoImg" />
                    </div>
                    <div className="contactInfo">
                        <div className="contactItem">
                            <img className="contactIcon" src={mail} />
                            <span>Enquiry@VibeStrings.com</span>
                        </div>
                        <div className="contactItem">
                            <img className="contactIcon" src={location} />
                            <span>San Francisco</span>
                        </div>
                    </div>
                </div>

                <div className="footerNav">
                    <div className="navColumn">
                        <h3>PAGES</h3>
                        <ul>
                            <li>Store</li>
                            <li>Collections</li>
                            <li>Support</li>
                        </ul>
                    </div>
                    <div className="navColumn">
                        <h3>PRODUCT</h3>
                        <ul>
                            <li>Terms</li>
                            <li>Privacy Policy</li>
                            <li>Copyright</li>
                        </ul>
                    </div>
                </div>

                <div className="footerSocial">
                    <h3>FOLLOW US</h3>
                    <div className="socialIcons">
                        <img src={socials} />
                    </div>
                </div>
            </div>

            <div className="footerCopyright">
                <p>© 2022 Copyright.VibeStrings</p>
            </div>
        </footer>
    )
}

export default Footer