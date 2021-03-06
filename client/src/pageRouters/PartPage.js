import React, { useEffect, useState } from "react";
import { PartContent } from "../components/partComponents/partContent";
import { PartNav } from "../components/partComponents/partNavigation";

export const PartPage = ({ match }) => {
  const [curPart, setPart] = useState({});
  const [allParts, setAll] = useState([]);

  useEffect(() => {
    const getData = () => {
      fetch(`/post/getpart/${match.params.postId}/${match.params.partId}`)
        .then((data) => data.json())
        .then((result) => {
            setPart(result.part);
            setAll(result.parts);
        });
    };
    getData();
  }, [match.params.partId]);

  return (
    <div>
      <h1>PART PAGE</h1>
      <div className="parts-nav-wrapper">
        <PartNav part={curPart} parts={allParts}/>
      </div>
      <div className="part-content-wrapper">
        <PartContent data={curPart}/>
      </div>
    </div>
  );
};
