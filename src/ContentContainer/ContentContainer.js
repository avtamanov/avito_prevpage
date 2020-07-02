import React from "react";
import './ContentContainer.css'
import ImageItem from './ImageItem.js'
import ModalWindow from "./ModalWindow";

const axios = require("axios");

class ContentContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            imagesData: [],
            overlayVisability: false,
            modalProps: {comments: []}
        };
    }

    async componentDidMount() {
        /*let request = */await axios.get("https://boiling-refuge-66454.herokuapp.com/images")
            .then(result => {
                this.setState({imagesData: result.data});
            });
    }

    imagesList(){
        let imagesArr = [];
        for(let i = 0; i < this.state.imagesData.length; i++){
            imagesArr.push(
                <ImageItem
                    key={i}
                    id={this.state.imagesData[i].id}
                    src={this.state.imagesData[i].url}
                    onClick={this.imageClick}
                />
                );
        }
        return imagesArr;
    }

    imageClick(imgID){
        this.setState({overlayVisability: true});
        let request = axios.get('https://boiling-refuge-66454.herokuapp.com/images/'+imgID)
            .then(result => {
                this.setState({modalProps: result.data});
                console.log(result.data);
            })
    }
    imageClick = this.imageClick.bind(this);

    overlayClick(){
        this.setState({overlayVisability: false});
    }
    overlayClick = this.overlayClick.bind(this);

    render() {
        let overlayName = 'overlay';
        let modalName = 'modalWindow'
        if(this.state.overlayVisability){
            overlayName+= " open";
            modalName+= ' open'
        }

        return <div className="ContentContainer">
            <h1 style={{'textAlign': 'center'}}>TEST APP</h1>
            <div className="imagesList">{this.imagesList()}</div>
            <div className={modalName}>
                <ModalWindow data={this.state.modalProps}
                             onClick={this.overlayClick}/>
            </div>
            <div className={overlayName} onClick={this.overlayClick}/>
        </div>
    }
}

export default ContentContainer;