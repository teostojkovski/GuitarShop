import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_MODELS_BY_BRAND, GET_BRANDS } from "../graphql/queries";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FilterList, Search, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import logo from "../assets/logo.png";
import watermark from "../assets/watermark.png";
import orange from "../assets/orangeBackground.png";
import '../styles/Models.css';
import Footer from "../components/Footer";

const Models = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();

  const [sortBy] = useState({ field: "name", order: "ASC" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showTypeFilter, setShowTypeFilter] = useState(false);

  // Always call useQuery, don't wrap in conditions
  const brandsQuery = useQuery(GET_BRANDS);
  const modelsQuery = useQuery(GET_MODELS_BY_BRAND, {
    variables: { id: brandId || "" , sortBy }, // fallback empty string
    skip: !brandId,
  });

  const { data: brandsData, loading: brandsLoading, error: brandsError } = brandsQuery;
  const { data: modelsData, loading: modelsLoading, error: modelsError } = modelsQuery;

  // Safe redirect if brandId missing or brand not found
  useEffect(() => {
    if (!brandsLoading) {
      if (!brandId || !brandsData?.findAllBrands.find(b => b.id === brandId)) {
        navigate("/");
      }
    }
  }, [brandId, brandsLoading, brandsData, navigate]);

  if (brandsLoading || modelsLoading) return <p>Loading...</p>;
  if (brandsError) return <p>Error loading brands: {brandsError.message}</p>;
  if (modelsError) return <p>Error loading models: {modelsError.message}</p>;

  const brand = brandsData.findAllBrands.find(b => b.id === brandId);
  if (!brand) return null; // while redirecting

  // Filter and search logic
  const filteredModels = modelsData.findBrandModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || model.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = ["All", ...new Set(modelsData.findBrandModels.map(model => model.type))];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredModels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentModels = filteredModels.slice(startIndex, endIndex);

  return (
    <>
      <section className="brandHero">
        <button className="homeButton" onClick={() => navigate("/")}>Back to Home</button>
        <img className="logo" src={logo} alt="Logo" />
        <div className="content">
          <h1 className="heading">Play like a <span>Rock star</span></h1>
          <p className="subheading">
            With a legacy dating back to the 1950s, Ibanez blends expert craftsmanship with cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance. Trusted by top artists worldwide, Ibanez guitars are built to play fast, sound bold, and stand out on any stage.
          </p>
          <p className="askChat">Ask ChatGPT</p>
        </div>
        <img className="orange" src={orange} alt="" />
        <img className="brandImg" src={brand.image} alt={brand.name} />
        <img className="watermark" src={watermark} alt="" />
      </section>

      <section className="selectionSection">
        <h1 className="selectionHeading">Check out the <span>Selection</span></h1>

        <div className="filterSearchBar">
          <div className="filterContainer">
            <button
              className="filterButton"
              onClick={() => setShowTypeFilter(!showTypeFilter)}
            >
              <FilterList />
              <span>Filter by type</span>
              <KeyboardArrowDown />
            </button>
            {showTypeFilter && (
              <div className="filterDropdown">
                {types.map(type => (
                  <button
                    key={type}
                    className={`filterOption ${selectedType === type ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedType(type);
                      setShowTypeFilter(false);
                      setCurrentPage(1);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="searchContainer">
            <Search className="searchIcon" />
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="searchInput"
            />
          </div>
        </div>

        <div className="productsGrid">
          {currentModels.map((model) => (
            <Link 
              to={`/details/${brandId}/${model.id}`} 
              key={model.id} 
              className="productCard"
            >
              <div className="productImage">
                <img src={model.image} alt={model.name} />
                {model.name.includes("Redondo") && (
                  <div className="videoOverlay">
                    <div className="videoIcons">
                      <span className="videoIcon pink">D</span>
                      <span className="videoIcon green">V</span>
                      <span className="videoIcon orange">D</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="productInfo">
                <h3 className="productName">{model.name}</h3>
                <p className="productPrice">${model.price.toLocaleString()}.00</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="paginationFooter">
          <div className="resultsCount">
            SHOWING {currentModels.length} RESULTS FROM {filteredModels.length}
          </div>
          <div className="pagination">
            <button
              className="paginationButton"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <KeyboardArrowLeft />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  className={`paginationButton ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="paginationEllipsis">...</span>
                <button
                  className="paginationButton"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              className="paginationButton"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <KeyboardArrowRight />
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Models;
