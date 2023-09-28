import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description , imgurl, newaurl , author , date ,source } = this.props;
    return (
      <div>
        <div className="card" style={{margin:'20px 10px'}}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"85%" , zIndex:1}}>
        <span className="badge text-bg-danger">{source}</span>
        </span>
          
          <img src={!imgurl ? 'https://www.hindustantimes.com/ht-img/img/2023/09/16/1600x900/WhatsApp_Image_2023-09-16_at_15.12.31_1694858174402_1694858182452.jpeg' : imgurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown " : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newaurl} target="_self" className="btn btn-dark">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
