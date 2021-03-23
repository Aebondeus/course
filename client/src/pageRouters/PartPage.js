import React, { useEffect, useState } from "react";
import { PageNotFound } from "../components/notFound";
import { PartContent } from "../components/partComponents/partContent";
import { PartNav } from "../components/partComponents/partNavigation";

export const PartPage = ({ match }) => {
  const [error, setError] = useState(false);
  const [curPart, setPart] = useState({});
  const [allParts, setAll] = useState([]);

  useEffect(() => {
    const getData = () => {
      fetch(`/post/getpart/${match.params.postId}/${match.params.partId}`)
        .then((data) => {
          if (data.status === 200) {
            console.log(data);
            return data.json();
          }
          console.log(data.status)
          throw Error;
        })
        .then((result) => {
          setPart(result.part);
          setAll(result.parts);
        })
        .catch(() => setError(true));
    };
    getData();
  }, [match.params.partId]);

  return !error ? (
    <div>
      <div className="parts-nav-wrapper">
        <PartNav part={curPart} parts={allParts} />
      </div>
      <div className="part-content-wrapper">
        <PartContent data={curPart} />
      </div>
    </div>
  ) : (
    <div className="parts-abscence">
      <PageNotFound />
    </div>
  );
};
