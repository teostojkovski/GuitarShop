import React, { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_MODEL_DETAILS } from "../graphql/queries";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import watermark from "../assets/watermark.png";
import orange from "../assets/orangeBackground.png";
import '../styles/GuitarDetails.css';

const GuitarDetails = () => {
  const { brandId, modelId } = useParams();
  const navigate = useNavigate();
  const [musicianIndex, setMusicianIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("specs");

  console.log('GuitarDetails - brandId:', brandId, 'modelId:', modelId);

  const { data, loading, error } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId },
  });

  console.log('GuitarDetails - data:', data, 'loading:', loading, 'error:', error);

  if (loading) return <div style={{ padding: '20px' }}><p>Loading details...</p></div>;
  if (error) return <div style={{ padding: '20px' }}><p>Error: {error.message}</p></div>;
  if (!data || !data.findUniqueModel) return <div style={{ padding: '20px' }}><p>No model data found</p></div>;

  const model = data.findUniqueModel;
  console.log('GuitarDetails - model:', model);

  const showMoreMusicians = () => {
    setMusicianIndex((prev) => prev + 2);
  };

  return (<>
    <section className="brandHero">
      <button className="homeButton" onClick={() => navigate(`/models/${brandId}`)}>Back to List</button>
      <img className="logo" src={logo} />
      <div className="content">
        <h1 className="guitarName">{model.name}</h1>
      </div>
      <img className="orange" src={orange} />
      <img className="brandImg" src={model.image} />
      <img className="watermark" src={watermark} />
    </section>
    <div style={{ padding: '20px', backgroundColor: 'white', minHeight: '80vh' }}>


      <div className="tabs">
        <button
          className={`specs ${activeTab === "specs" ? "active" : ""}`}
          onClick={() => setActiveTab("specs")}
        >
          Specification
        </button>

        <button
          className={`musicians ${activeTab === "musicians" ? "active" : ""}`}
          onClick={() => setActiveTab("musicians")}
        >
          Who plays it?
        </button>
      </div>

      {activeTab === "specs" && (
        <div>
          <p className="descriptionModel">{model.description}</p>
          <ul className="specsList">
            <li>Body Wood: {model.specs?.bodyWood || 'N/A'}</li>
            <li>Neck Wood: {model.specs?.neckWood || 'N/A'}</li>
            <li>Fingerboard: {model.specs?.fingerboardWood || 'N/A'}</li>
            <li>Pickups: {model.specs?.pickups || 'N/A'}</li>
            <li>Tuners: {model.specs?.tuners || 'N/A'}</li>
            <li>Scale Length: {model.specs?.scaleLength || 'N/A'}</li>
            <li>Bridge: {model.specs?.bridge || 'N/A'}</li>
          </ul>
        </div>
      )}

      {activeTab === "musicians" && (
        <div className="musiciansContainer">
          {model.musicians?.slice(0, musicianIndex + 2).map((musician, idx) => (
            <div key={idx} className="musicianCard">
              <img src={musician.musicianImage} alt={musician.name} />
              <p>{musician.name}</p>
              <p>Bands: {musician.bands?.join(", ") || 'N/A'}</p>
            </div>
          ))}
          {model.musicians && musicianIndex + 2 < model.musicians.length && (
            <button onClick={showMoreMusicians} style={{ marginTop: '20px', padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: 'orangered', color: 'white', cursor: 'pointer' }}>
              Show More
            </button>
          )}
        </div>
      )}
    </div>
    <Footer />
  </>);
};

export default GuitarDetails;
