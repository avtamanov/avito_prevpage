import React from "react";
import './ModalWindow.css'

const axios = require('axios');

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
    
    async function toComment() {
        let name = document.getElementsByClassName("toCommentName")[0];
        let comment = document.getElementsByClassName("toCommentText")[0];
        if(name.value !== "" &&  comment.value !== "")
        {
            let date = new Date().getTime();
            let promise = await axios.post("https://boiling-refuge-66454.herokuapp.com/images/"+data.id+"/comments",
                {
                    'id': name.value,
                    'text': comment.value,
                    'date': date
                })
                .then(result => {
                    console.log(result);
                });
            name.value = "";
            comment.value = "";
        }
    }

    return <div>
        <div className="buttonContainer">
            <button className="close" onClick={props.onClick}>Close</button>
        </div>
        <img src={data.url} className="imageContent"/>
        <div className="commentsList">{commentsArr}</div>
        <div className="toComment">
            <input className="toCommentName" placeholder="Ваше имя"/>
            <input className="toCommentText" placeholder="Ваш комментарий"/>
            <button className="toCommentButton" onClick={toComment}>Оставить комментарий</button>
        </div>
    </div>
}

export default ModalWindow;