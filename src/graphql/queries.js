import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      origin
      image
    }
  }
`;

export const GET_MODELS_BY_BRAND = gql`
  query GetModelsByBrand($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      price
    }
  }
`;

export const GET_MODEL_DETAILS = gql`
  query GetModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      description
      price
      image
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;