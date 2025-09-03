import React, { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_MODELS_BY_BRAND, GET_BRANDS } from "../graphql/queries";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import watermark from "../assets/watermark.png";
import orange from "../assets/orangeBackground.png";
import '../styles/Models.css';

const Models = () => {
  const { brandId } = useParams(); // get brandId from URL
  const [sortBy] = useState({ field: "name", order: "ASC" });

  const { data: brandsData, loading: brandsLoading, error: brandsError } = useQuery(GET_BRANDS);

  const { data: modelsData, loading: modelsLoading, error: modelsError } = useQuery(GET_MODELS_BY_BRAND, {
    variables: { id: brandId, sortBy },
    skip: !brandId,
  });

  if (!brandId) return <p>No brand selected</p>;
  if (brandsLoading || modelsLoading) return <p>Loading...</p>;
  if (brandsError) return <p>Error loading brands: {brandsError.message}</p>;
  if (modelsError) return <p>Error loading models: {modelsError.message}</p>;

  // Find the specific brand from the brands data
  const brand = brandsData.findAllBrands.find(b => b.id === brandId);
  if (!brand) return <p>Brand not found</p>;

  return (<>
    <section className="brandHero">
      <img className="logo" src={logo} />
      <div className="content">
        <h1 className="heading">Play like a <span>Rock star</span></h1>
        <p className="subheading">With a legacy dating back to the 1950s, Ibanez blends expert craftsmanship with cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance. Trusted by top artists worldwide, Ibanez guitars are built to play fast, sound bold, and stand out on any stage.</p>
        <p className="askChat">Ask ChatGPT</p>
      </div>
      <img className="orange" src={orange} />
      <img className="brandImg" src={brand.image} />
      <img className="watermark" src={watermark} />
    </section>

    <section className="brandHero">
      <h1 className="selectionHeading">Check out the <span>Selection</span></h1>
    </section>
    <ul>
      {modelsData.findBrandModels.map((model) => (
        <li key={model.id}>{model.name} - {model.type}</li>
      ))}
    </ul>
  </>);
};

export default Models;