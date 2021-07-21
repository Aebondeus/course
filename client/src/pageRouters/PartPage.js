import React, { useEffect, useState } from "react";
import { PageNotFound } from "../components/notFound";
import { PartContent } from "../components/partComponents/partContent";
import { PartNav } from "../components/partComponents/partNavigation";
import { serverRoutes } from '../constants/allRoutes';

const { part: { main } } = serverRoutes;

export const PartPage = ({ match }) => {
  const [error, setError] = useState(false);
  const [curPart, setPart] = useState({});
  const [allParts, setAll] = useState([]);
  const postId = match.params.postId;
  const partId = match.params.partId;

  useEffect(() => {
    const getData = () => {
      fetch(`${main}/${postId}/${partId}`)
        .then((data) => {
          if (data.status === 200) {
            return data.json();
          }
          throw Error;
        })
        .then((result) => {
          setPart(result.part);
          setAll(result.parts);
        })
        .catch(() => setError(true));
    };
    getData();
  }, [partId, postId]);

  if (!!error) {
    return <PageNotFound />;
  }
  return (
    <div>
      <div className="parts-nav-wrapper">
        <PartNav part={curPart} parts={allParts} />
      </div>
      <div className="part-content-wrapper">
        <PartContent part={curPart} />
      </div>
      <div className="parts-nav-wrapper">
        <PartNav part={curPart} parts={allParts} />
      </div>
    </div>
  );
};
