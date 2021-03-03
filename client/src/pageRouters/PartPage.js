import React, { useEffect, useState } from "react";
import { PartContent } from "../partComponents/partContent";
import { PartNav } from "../partComponents/partNavigation";

export const PartPage = ({ match }) => {
  const [curPart, setPart] = useState({});
  const [allParts, setAll] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch(`/post/getpart/${match.params.postId}/${match.params.partId}`)
        .then((data) => data.json())
        .then((result) => {
          setTimeout(() => {
            setPart(result.part);
            setAll(result.parts)
          }, 0);
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
