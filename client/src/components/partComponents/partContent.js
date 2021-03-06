import React from "react";

export const PartContent = (props) => {
    return (
        <div className="card">
            <div className="card-header">
                {props.data.name}
            </div>
            <div className="card-body">
                {props.data.content}
            </div>
        </div>
    )
}