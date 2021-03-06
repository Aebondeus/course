import React from "react";
import {Link} from "react-router-dom";

export const Comments = (props) => {
    if (!!props.data.length) {
        return props.data.map((comment, idx) => {
            return (
                <div className="comment" key={idx} style={{marginTop:"1rem"}}>
                    <div className="card">
                        <div className="card-body">
                            <Link to={`/user/${comment.authorId}`}>
                                <div className="comment-author">{comment.author}</div>
                            </Link>
                            <div className="comment-content">{comment.content}</div>
                            <div className="comment-date">{comment.date}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    else {
        return (
            <div className="comment-empty">Wow... such empty here...</div>
        )
    }
}