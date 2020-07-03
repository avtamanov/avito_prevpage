import React from "react";

function ImageItem(props){

    let onClickFunc = props.onClick.bind(this, props.id);

    return <div className="imageItem">
        <img className="imageItself"
            src={props.src}
            onClick={onClickFunc}/>
    </div>
}

export default ImageItem;