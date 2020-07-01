import React from "react";
import './ModalWindow.css'

function ModalWindow(props){
    let data = props.data;
    let commentsArr = [];
    if(data.comments.length < 1){
        commentsArr.push(<li key={-1}>No comments yet</li>)
    }
    for(let i = 0; i < data.comments.length; i++){
        let date = new Date(data.comments[i].date);
        let dateStr = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear();
        commentsArr.push(<li className="commentItem" key={i}>
            <div className="commentDate">{dateStr}</div>
            <div className="commentText">{data.comments[i].text}</div>
        </li>)
    }

    return <div>
        <button className="close" onClick={props.onClick}>Close</button>
        <img src={data.url}/>
        <div className="commentsList">{commentsArr}</div>
    </div>
}

export default ModalWindow;