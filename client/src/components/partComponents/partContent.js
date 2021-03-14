import React from "react";
import ReactMarkdown from "react-markdown"

export const PartContent = (props) => {
    return (
        <div className="card">
            <div className="card-header">
                {props.data.name}
            </div>
            <div className="card-body">
                <ReactMarkdown source={props.data.content} />
            </div>
        </div>
    )
}