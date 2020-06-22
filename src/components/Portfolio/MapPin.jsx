import React from "react";
import { Tooltip, Modal, Badge } from "antd";
import MapPinLocation from "../../assets/images/map-pin.png";
const Carousel = require("react-responsive-carousel").Carousel;

export default class MapPin extends React.PureComponent {
  if240(number) {
    if (number === "240") {
      return "leftTop";
    } else {
      return "rightTop";
    }
  }
  renderHeroOrImageCarasoul() {
    if (this.props.imageCarasoul) {
      if (this.props.investmentFund) {
        return (
          <div>
            <div className="investment-fund-label">
              <p style={{ color: "#fff", fontSize: "13px" }}>
                {this.props.investmentFund}
              </p>
            </div>
            <Carousel showThumbs={true}>
              {this.props.imageCarasoul.map(image => {
                return <img src={image} alt={image} />;
              })}
            </Carousel>
          </div>
        );
      } else {
        return (
          <Carousel showThumbs={true}>
            {this.props.imageCarasoul.map(image => {
              return <img src={image} alt={image} />;
            })}
          </Carousel>
        );
      }
    }
    if (this.props.investmentFund) {
      return (
        <div>
          <div className="investment-fund-label">
            <p style={{ color: "#fff", fontSize: "13px" }}>
              {this.props.investmentFund}
            </p>
          </div>
          <img
            src={this.props.heroImageLocation}
            className={"modal-photo"}
            alt="Modal"
          />
        </div>
      );
    } else {
      return (
        <img
          src={this.props.heroImageLocation}
          className={"modal-photo"}
          alt="Modal"
        />
      );
    }
  }
  render() {
    return (
      <div>
        <Tooltip
          title={this.props.address}
          placement={this.if240(this.props.number)}
        >
          <div
            onClick={() => this.props.openMapModal()}
            className="map-pin-icon"
            style={{
              top: this.props.top + "%",
              left: this.props.left + "%"
            }}
          >
            <img
              src={MapPinLocation}
              alt="Map Pin"
              style={{
                maxWidth: 45 + "px"
              }}
            />
            <p
              style={{
                position: "absolute",
                color: "white",
                fontSize: 16 + "px",
                top: 8 + "px",
                width: 83 + "%",
                marginRight: 20 + "px",
                textAlign: "center",
                fontFamily: "serif",
                fontWeight: 800
              }}
            >
              <Badge />
              <span
                className="map-marker-icon ant-badge ant-badge-status ant-badge-not-a-wrapper"
                style={{
                  position: "absolute",
                  right: "2px",
                  top: "-4px"
                }}
              >
                <span
                  className="ant-badge-status-dot ant-badge-status-processing"
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "none"
                  }}
                />
              </span>
              {this.props.number}
            </p>
          </div>
        </Tooltip>
        <Modal
          closable={true}
          style={{
            top: 50,
            width: 95 + "%"
          }}
          visible={this.props.open}
          onOk={this.props.closeMapModal}
          onCancel={this.props.closeMapModal}
          footer={false}
          maskClosable={true}
        >
          <div
            onClick={this.props.closeMapModal}
            style={{
              float: "right",
              padding: 20 + "px",
              borderLeft: "1px solid #b3b3b3",
              cursor: "pointer"
            }}
          >
            <div className="modal-close">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 25 25"
                className="modal-close-svg"
                style={{ enableBackground: "new 0 0 25 25" }}
              >
                <path
                  d="M13.2,12.5L24.4,1.2c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0L12.5,11.8L1.2,0.5C1,0.4,0.7,0.4,0.5,0.5S0.4,1,0.5,1.2
                  l11.3,11.3L0.5,23.7c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.2,0.1,0.3,0.1s0.2,0,0.3-0.1l11.3-11.3l11.3,11.3c0.1,0.1,0.2,0.1,0.3,0.1
                  s0.2,0,0.3-0.1c0.2-0.2,0.2-0.5,0-0.7L13.2,12.5z"
                />
              </svg>
            </div>
          </div>

          <br />
          {this.renderHeroOrImageCarasoul()}
          <br />
          <h1
            style={{
              color: "#1d4a63",
              textAlign: "center",
              fontSize: 26 + "px",
              fontFamily: "kepler-std-display"
            }}
          >
            {this.props.formalAddress}
          </h1>
          <h2
            style={{
              color: "gray",
              textAlign: "center",
              fontSize: 17 + "px",
              fontFamily: "kepler-std-display"
            }}
          >
            <i>{this.props.city}</i>
          </h2>
          <br />
        </Modal>
        <div className="mobile-modal">
          {this.renderHeroOrImageCarasoul()}
          <br />
          <h1
            style={{
              color: "#1d4a63",
              textAlign: "center",
              fontSize: 26 + "px",
              fontFamily: "kepler-std-display"
            }}
          >
            {this.props.formalAddress}
          </h1>
          <h2
            style={{
              color: "gray",
              textAlign: "center",
              fontSize: 17 + "px",
              fontFamily: "kepler-std-display"
            }}
          >
            <i>{this.props.city}</i>
          </h2>
        </div>
      </div>
    );
  }
}
