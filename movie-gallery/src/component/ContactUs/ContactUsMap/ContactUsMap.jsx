import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function ContactUsMap() {
  const defaultProps = {
    center: {
      lat: 43.998724827897,
      lng: 26.4634633263893,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={43.998724827897}
          lng={26.4634633263893}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
