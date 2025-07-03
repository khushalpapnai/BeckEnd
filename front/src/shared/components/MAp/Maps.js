import React from "react";

import "./Map.css";

const Maps = () => {
  return (
    <div className="map">
      <iframe
        id="iframe"
        title="maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d879113.5867475966!2d80.95257917468878!3d30.60470694347665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a4400b0179d9cb%3A0xbf92f6f85cd4475d!2sBurang%20County%2C%20Ngari%20Prefecture%2C%20Tibet%2C%20China!5e0!3m2!1sen!2sin!4v1737119109433!5m2!1sen!2sin"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />{" "}
    </div>
  );
};
export default Maps;
