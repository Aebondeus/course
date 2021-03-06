import React, { useEffect, useState } from "react";
import {MostRated} from "../components/mainComponents/mostRated.js";
import {LastUpdated} from "../components/mainComponents/lastUpdated.js";

export const MainPage = ({match}) => {
  const [lastData, setLast] = useState([]);
  const [ratedData, setRated] = useState([]);

  useEffect(() => {
    let getData = async () => {
      await fetch("/main/ratedposts")
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            setRated(data);
          }, 0);
        });
      await fetch("/main/updatedposts")
        .then((response) => response.json())
        .then((data) => {
          setTimeout(() => {
            setLast(data);
          }, 0);
        });
    };
    getData();
  }, [match]);

  // main-content, extra-part - side components
  return (
    <div className="main-content">
      <div className="all-fictions">
        <MostRated posts={ratedData} />
        <LastUpdated posts={lastData} />
      </div>
      <div className="extra-part">
        <div className="ft-search">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Search</div>
              <form>
                <input></input>
                <button style={{ marginLeft: "6px" }}>Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="card-body">
            <h5 className="card-title">Tag cloud</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Here will be tag cloud
            </h6>
            <p className="card-text">Tag Tag Tag Tag Tag</p>
          </div>
        </div>
      </div>
    </div>
  );
};
