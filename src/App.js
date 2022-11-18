import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [adsData, setAdsData] = useState([]);
  const [searchText, setSearchText] = useState("");


  
  
  const handleAllAds = async () =>{
    let response = await fetch("http://localhost:5000/api/ads");
    let data = await response.json();

    if (data.statusCode === 200) {
      setAdsData(data.data);
    }
    setSearchText("")
  }
  
  useEffect(() => {
    
    handleAllAds();
  }, []);
  const handleSearchbtn = () => {

    async function handleApiCall() {
      let response = await fetch(
        `http://localhost:5000/api/ads/search?text=${searchText}`
      );
      let data = await response.json();
      if (data.statusCode === 200) {
        setAdsData(data.data);
      }
    }
    handleApiCall();
  };

  return (
    <div>
      <div className="App-nav">
        <div className="Search-box">
          <input onChange={(event)=>setSearchText(event.target.value)} className="search-input" type={"text"} placeholder="Seach Ads" value={searchText} />
          <button onClick={handleSearchbtn} className="search-button">
            Search{" "}
          </button>
          <button onClick={handleAllAds} className="search-button">
            Reset
          </button>
        </div>
      </div>
      <div className="grid-container">
        {adsData.length > 0 ? adsData.map((ads, index) => {
          return (
            <div key={index} className="grid-item">
              <div className="ads-box">
                <h2>{ads.company.name}</h2>
                <h4>{ads.headline}</h4>
                <img
                  src={`http://localhost:5000/ads-images/${ads.imageUrl}`}
                  alt={ads.company.name}
                  className="image-box"
                />
                <h5>{ads.primaryText}</h5>
                <a href={`https://${ads.company.url}`}>
                  <button className="search-button btn-link">{ads.CTA}</button>
                </a>
              </div>
            </div>
          );
        }) 
        : (
        <div className="not-found-container">
          <div className="not-found-error">No Ads Found</div>
          </div>
          )
          }
      </div>
    </div>
  );
}

export default App;
