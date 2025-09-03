import React, { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_MODEL_DETAILS } from "../graphql/queries"; // adjust path

const GuitarDetails = ({ brandId, modelId }) => {
  const [musicianIndex, setMusicianIndex] = useState(0); // track how many musicians to show
  const [activeTab, setActiveTab] = useState("specs"); // "specs" or "musicians"

  const { data, loading, error } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId },
  });

  if (loading) return <p>Loading details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const model = data.findUniqueModel;

  const showMoreMusicians = () => {
    setMusicianIndex((prev) => prev + 2);
  };

  return (
    <div>
      <h1>{model.name}</h1>
      <p>Type: {model.type}</p>
      <p>Price: ${model.price}</p>

      {/* Tabs */}
      <div>
        <button onClick={() => setActiveTab("specs")}>Specs</button>
        <button onClick={() => setActiveTab("musicians")}>Musicians</button>
      </div>

      {activeTab === "specs" && (
        <div>
          <p>Body Wood: {model.specs.bodyWood}</p>
          <p>Neck Wood: {model.specs.neckWood}</p>
          <p>Fingerboard: {model.specs.fingerboardWood}</p>
          <p>Pickups: {model.specs.pickups}</p>
          <p>Tuners: {model.specs.tuners}</p>
          <p>Scale Length: {model.specs.scaleLength}</p>
          <p>Bridge: {model.specs.bridge}</p>
        </div>
      )}

      {activeTab === "musicians" && (
        <div>
          {model.musicians.slice(0, musicianIndex + 2).map((musician, idx) => (
            <div key={idx}>
              <p>{musician.name}</p>
              <p>Bands: {musician.bands.join(", ")}</p>
              <img src={musician.musicianImage} alt={musician.name} width={100} />
            </div>
          ))}
          {musicianIndex + 2 < model.musicians.length && (
            <button onClick={showMoreMusicians}>Show More</button>
          )}
        </div>
      )}
    </div>
  );
};

export default GuitarDetails;
