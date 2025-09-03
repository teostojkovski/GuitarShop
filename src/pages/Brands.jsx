import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_BRANDS } from "../graphql/queries";
import { useNavigate } from "react-router-dom";
import { Grid3x3, LocalShipping, Payment } from "@mui/icons-material";
import guitarImg from "../assets/landingGuitar.png";
import logo from "../assets/logo.png";
import mockupLeft from "../assets/mockupLeft.png";
import mockupRight from "../assets/mockupRight.png";
import orangeBack from "../assets/orangeBack.png";
import downloadApp from "../assets/dowloadApp.png";
import watermark from "../assets/watermark.png";
import socials from "../assets/socials.png";
import mail from "../assets/mail.png";
import location from "../assets/location.png";
import '../styles/Brands.css';

const Brands = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_BRANDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <section className="landingSection">
        <img className="logo" src={logo} />;
        <h1 className="heading">Browse top quality <span>Guitars</span> online</h1>
        <p className="subheading">Explore 50k+ latest collections of branded guitars online with VibeStrings.</p>
        <img className="landingImg" src={guitarImg} />
        <img className="watermark" src={watermark} />
      </section>

      <section className="featuresSection">
        <h1 className="featuresHeading">Featuring the <span>Best Brands</span></h1>
        <p className="featuresSub">Select your preferred brand and explore our exquisite collection.</p>
        <ul>
          {data.findAllBrands.map((brand) => (
            <li
              key={brand.id}
              style={{ cursor: "pointer", marginBottom: "10px" }}
              onClick={() => navigate(`/models/${brand.id}`)}
            >
              {<img src={brand.image} />}
            </li>
          ))}
        </ul>
      </section>

      <section className="wvsSection">
        <h1 className="wvsHeading">Why try <span>VibeStrings</span>?</h1>
        <div className="wvsFeatures">
          <div className="wvsFeature">
            <div className="wvsIcon">
              <Grid3x3 sx={{ color: '#9CA3AF', fontSize: 28 }} />
            </div>
            <h3 className="wvsFeatureTitle">SMOOTH BROWSING</h3>
            <p className="wvsFeatureDesc">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.</p>
          </div>
          <div className="wvsFeature">
            <div className="wvsIcon">
              <LocalShipping sx={{ color: '#9CA3AF', fontSize: 28 }} />
            </div>
            <h3 className="wvsFeatureTitle">EASY DELIVERY</h3>
            <p className="wvsFeatureDesc">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.</p>
          </div>
          <div className="wvsFeature">
            <div className="wvsIcon">
              <Payment sx={{ color: '#9CA3AF', fontSize: 28 }} />
            </div>
            <h3 className="wvsFeatureTitle">SWIFT PAYMENTS</h3>
            <p className="wvsFeatureDesc">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.</p>
          </div>
        </div>
      </section>

      <section className="heroSection">
        <div className="heroContent">
          <div className="heroLeft">
            <h1 className="heroHeading">Browse and buy your <span>favorite guitars</span> with VibeStrings.</h1>
            <div className="appBadges">
              <img src={downloadApp} className="badges" />            </div>
          </div>
          <div className="heroRight">
            <div className="mockupContainer">
              <img src={orangeBack} alt="Background" className="orangeBackground" />
              <img src={mockupLeft} alt="Mobile App Feed" className="mockupLeft" />
              <img src={mockupRight} alt="Mobile App Product Detail" className="mockupRight" />
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Brands;
