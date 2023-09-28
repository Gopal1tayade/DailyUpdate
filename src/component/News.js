import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
// import PropTypes from 'prop-types'

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }


  async componentDidMount() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50)
    let personDate = await data.json();
    this.props.setProgress(70)
    console.log(personDate);
    this.setState({
      articles: personDate.articles,
      totalResults: personDate.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }
  handalNext = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
        }&category=${this.props.category
        }&apiKey=${this.props.apikey}&page=${this.state.page + 1
        }&pagesize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let personDate = await data.json();
      console.log(personDate);
      this.setState({
        page: this.state.page + 1,
        articles: personDate.articles,
        loading: false,
      });
      console.log(this.state.page);
    }
  };

  handleprevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
      }&category=${this.props.category
      }&apiKey=${this.props.apikey}&page=${this.state.page - 1
      }&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let personDate = await data.json();
    console.log(personDate);
    this.setState({
      page: this.state.page - 1,
      articles: personDate.articles,
      loading: false,
    });
    console.log(this.state.page);
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "35px 0px" }}>
          Newaletter - Today Headline
        </h2>
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : " "}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : " "
                    }
                    imgurl={element.urlToImage}
                    newaurl={element.url}
                    source={element.source.name}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          <div className="container d-flex justify-content-between my-3">
            <button
              type="button"
              disabled={this.state.page <= 1}
              className="btn btn-dark"
              onClick={this.handleprevious}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              className="btn btn-dark"
              onClick={this.handalNext}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
