import React, { useEffect, useState } from "react";
import { PageNotFound } from "../components/notFound";
import { PartContent } from "../components/partComponents/partContent";
import { PartNav } from "../components/partComponents/partNavigation";

export const PartPage = ({ match }) => {
  const [error, setError] = useState(false);
  const [curPart, setPart] = useState({});
  const [allParts, setAll] = useState([]);
  const postId = match.params.postId;
  const partId = match.params.partId;

  useEffect(() => {
    const getData = () => {
      fetch(`/handle_post/part/${postId}/${partId}`)
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
  }, [partId]);

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
