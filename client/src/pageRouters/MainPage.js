import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Card } from "react-bootstrap";
import { MostRated } from "../components/mainComponents/mostRated.js";
import { LastUpdated } from "../components/mainComponents/lastUpdated.js";
import { Cloud } from "../components/mainComponents/tagCloud.js";
import { serverRoutes } from "../constants/allRoutes";

const {
  main: { ratedPosts, updatedPosts },
} = serverRoutes;
export const MainPage = ({ match }) => {
  document.title = "MORDOR | The Land of cursed future";
  const [lastData, setLast] = useState(null);
  const [ratedData, setRated] = useState(null);

  useEffect(() => {
    let getData = async () => {
      await fetch(ratedPosts)
        .then((res) => res.json())
        .then((data) => setRated(data));
      await fetch(updatedPosts)
        .then((response) => response.json())
        .then((data) => {
          setLast(data);
        });
    };
    getData();
  }, [match]);

  return (
    <div className="main-content">
      <div className="first-half">
        <div className="rated-fictions col-lg-8 col-sm-12">
          <MostRated posts={ratedData} />
        </div>
        <div className="tag-cloud col-lg-4 col-sm-12">
          <Card className="card-out">
            <Card.Body>
              <Card.Title className="text-center">
                <FormattedMessage id="tag-cloud" />
              </Card.Title>
              <Card className="cloud-container">
                <Card.Body>
                  <Cloud />
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="second-half">
        <div className="last-updated col-lg-8 col-sm-12">
          <LastUpdated posts={lastData} />
        </div>
      </div>
    </div>
  );
};
