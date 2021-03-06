import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import { Row, Col, Anchor, Collapse } from "antd";
import Press from "../assets/images/press-main-image.jpg";
import HeroImage from "../components/HeroImage";
import { HashLink } from "react-router-hash-link";
import DOMPurify from 'dompurify';
import client from '../contentfulClient';
import Loader from '../components/ui/Loader';
import Instagram from "../assets/images/ig-color-icon.png";

// eslint-disable-next-line
const Panel = Collapse.Panel;
var showdown = require("showdown");
var moment = require("moment");
const { Link } = Anchor;

const BlogPostPreview = props => {
  const converter = new showdown.Converter();
  return (
    <Col xs={{ span: 24 }} md={{ span: 8 }} key={this.props.post.sys.id}>
      <HashLink
        style={{ textDecoration: "none" }}
        to={"/press/" + props.post.fields.slug + "/" + props.post.sys.id}
      >
        <div className="blog-post-preview-wrapper">
          <div className="header-image" />
          <div className="content">
            <p className="title">
              {this.props.post.fields.title.toUpperCase()}
            </p>
            <p className="description">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(converter.makeHtml(props.entries[0].fields.summary)),
                }}
              />
            </p>
          </div>
        </div>
      </HashLink>
    </Col>
  );
};

export default class BlogHome extends Component {
  state = {
    entries: null,
    edited: false,
    error: null,
  };

  componentDidMount() {
    client.getEntries({
        content_type: "blogPost",
        order: "-fields.publishDate"
      })
      .then((entries) => {
        this.setState({ entries: entries.items });
      })
      .catch(error => this.setState({ error }));
  }
  
  renderEntries() {
    var posts = this.state.entries;
    posts.shift();
    this.setState({ edited: true });
    return posts;
  }

  renderPosts() {
    return this.state.entries.map((post) => {
      return (
        <BlogPostPreview
          post={post}
          key={post.sys.id}
          entries={this.state.entries}
        />
      );
    });
  }

  renderPress() {
    return this.state.entries.map(entry => (
      <Col
        key={entry.fields.publishDate}
        className="paragraph-emphasis"
        xs={24}
        md={{ span: 16, offset: 4 }}
        style={{ paddingBottom: 30 }}
      >
        <div id={entry.fields.title} className="post pb-5 text-center mx-auto">
          <h3 className="section-header-blue date">
            {moment(entry.fields.publishDate).format("MMMM DD, Y")}
          </h3>
          <h5 className="post-title my-4">
            <b>{entry.fields.title.toUpperCase()}</b>
          </h5>
          <p>{entry.fields.summary}</p>
          <HashLink to={"/press/" + entry.fields.slug + "/" + entry.sys.id}>
            <button className="read-more btn btn-lg py-3 px-5 mt-3">
              <i>read more</i>
            </button>
          </HashLink>
        </div>
      </Col>
    ));
  }

  renderNavigation() {
    return this.state.entries.map(entry => (
      <Link
        key={entry.fields.title}
        href={"#" + entry.fields.title}
        title={moment(entry.fields.publishDate)
          .format("MMMM DD, Y")
          .toUpperCase()}
      />
    ));
  }

  render() {
    if (this.state.error) {
      return (
        <DocumentTitle title={"Melillo Equities"}>
          <div
            className="about-wrapper portfolio-detail-wrapper"
            style={{ minHeight: "100vh" }}
          >Something went wrong. Try refreshing the page.</div>
        </DocumentTitle>
      );
    }
    if (!this.state.entries) {
      return <Loader />;
    }

    return (
      <div>
        <DocumentTitle title={"Press | Melillo Equities"}>
          <div>
            <HeroImage
              className="hero-bottom-header"
              height={100}
              background={Press}
              bottomHeader={"PRESS"}
            />
            <Row className="gutter-row" id="a3" gutter={45}>
              <Col
                md={{ span: 4 }}
                style={{ zIndex: 9999, paddingTop: 30 }}
                className="anchor-menu float-right ml-auto"
              >
                <Anchor affix={false} style={{ border: "none" }}>
                  <a
                    className="btn follow-us px-3"
                    href="https://www.instagram.com/melilloequities/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="float-right ml-auto m-0">
                      <span className="follow-text">
                        Follow us on Instagram{" "}
                      </span>
                      <img
                        className="footer-icon img-fluid"
                        src={Instagram}
                        alt="Instagram"
                      />
                    </span>
                  </a>
                </Anchor>
                <Anchor
                  affix={true}
                  offsetTop={223}
                  showInkInFixed={true}
                  style={{ marginTop: 60 }}
                >
                  {this.renderNavigation()}
                </Anchor>
              </Col>

              <Col
                xs={24}
                md={{ span: 16, offset: 4 }}
                style={{ paddingBottom: 60 }}
              >
                <div className="mobile-hide text-center mx-auto mb-5">
                  <a
                    className="follow-mobile btn px-3 m"
                    href="https://www.instagram.com/melilloequities/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="float-right ml-auto m-0 pt-2">
                      <span className="follow-mobile-text pt-1">
                        Follow us on Instagram{" "}
                      </span>
                      <img
                        className="footer-icon img-fluid"
                        src={Instagram}
                        alt="Instagram"
                      />
                    </span>
                  </a>
                </div>
              </Col>
              {this.renderPress()}
            </Row>
          </div>
        </DocumentTitle>
      </div>
    );
  }
}
