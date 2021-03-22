import React, {useState, useEffect} from "react";
import {useLoad} from "../hooks/loadHook.js";
import {useHistory} from "react-router-dom";
import {Container} from "react-bootstrap";
import { PartUpdate } from "../components/updatePartComponents/updatePart.js";

export const UpdatePart = ({match}) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [content, setContent] = useState('')
    const [selectedFile, setSelectedFile] = useState("");
    const [prevImage, setImage] = useState("")
    const [selectedTab, setSelectedTab] = useState("write");
    const {request, load} = useLoad();

    useEffect(() => {
        fetch(`/post/getpart/${match.params.postId}/${match.params.partId}`)
          .then((data) => data.json())
          .then((data) => {
            setName(data.part.name);
            setContent(data.part.content);
            setImage(data.part.image);
          });
    }, []);

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!!selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          finalSubmit(reader.result, true);
        };
      } else {
        finalSubmit(prevImage, false);
      }
    }

    const finalSubmit = async (image, updated) => {
      const data = {name, content, image};
      console.log(data);
      await request("/post/amendpart", "POST", {
        partId: match.params.partId,
        data,
        prevImg: !!updated ? prevImage : null,
      });
      history.push(`/post/${match.params.postId}`);
    }

    const handleFileInput = (file) => {
      console.log(file);
      console.log(file[0])
      setSelectedFile(file[0]);
    }

    const nameHandler = (event) => {
        setName(event.target.value)
    }

    return (
      <Container className="update-part-wrapper">
        <PartUpdate
          name={name}
          content={content}
          selectedTab={selectedTab}
          load={load}
          nameHandler={nameHandler}
          handleFileInput={handleFileInput}
          setContent={setContent}
          setSelectedTab={setSelectedTab}
          handleSubmit={handleSubmit}
        />
      </Container>
    );
}

