import React, {useState, useEffect} from "react";
import {useLoad} from "../hooks/loadHook.js";
import {useHistory} from "react-router-dom";
import {Container} from "react-bootstrap";
import { PartUpdate } from "../components/updatePartComponents/updatePart.js";
import { propTypes } from "react-bootstrap/esm/Image";

export const UpdatePart = ({match}) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [content, setContent] = useState('')  
    const [selectedTab, setSelectedTab] = useState("write");
    const {request, load} = useLoad();

    useEffect(() => {
        fetch(`/post/getpart/${match.params.postId}/${match.params.partId}`)
          .then((data) => data.json())
          .then((data) => {
            setName(data.part.name);
            setContent(data.part.content);
          });
    }, []);

    const nameHandler = (event) => {
        setName(event.target.value)
    }
    const updateHandler = async (event) => {
        event.preventDefault();
        const partId = match.params.partId;
        await request('/post/amendpart', 'POST', {partId, data:{name, content}});
        history.push(`/post/${match.params.postId}`)
    }

    return (
      <Container>
        <PartUpdate
          name={name}
          nameHandler={nameHandler}
          content={content}
          setContent={setContent}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          onSubmit={updateHandler}
          load={load}
        />
      </Container>
    );
}

