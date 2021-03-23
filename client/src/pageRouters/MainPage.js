import React, { useEffect, useState } from "react";
import {FormattedMessage} from "react-intl";
import {Card} from "react-bootstrap";
import { MostRated } from "../components/mainComponents/mostRated.js";
import { LastUpdated } from "../components/mainComponents/lastUpdated.js";
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
              <Card>
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
