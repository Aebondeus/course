import React, { useEffect, useState } from "react";
import { MostRated } from "../components/mainComponents/mostRated.js";
import { LastUpdated } from "../components/mainComponents/lastUpdated.js";
import {FormattedMessage} from "react-intl";
import { Cloud } from "../components/mainComponents/tagCloud.js";

export const MainPage = ({ match }) => {
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

  const mockEvent = (event) => {
    console.log("something");
  };
  // main-content, extra-part - side components
  return (
    <div className="main-content">
      <div className="all-fictions">
        <MostRated posts={ratedData} />
        <LastUpdated posts={lastData} />
      </div>
      <div className="extra-part">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title"><FormattedMessage id="tag-cloud"/></h5>
            <Cloud />
          </div>
        </div>
      </div>
    </div>
  );
};
