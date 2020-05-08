"use strict";

import getDistance from "geolib/es/getDistance";

export function generateMapsUrl(latitude, longitude) {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export function getCurrentLocation(navigator) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) resolve(null);
    else {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        function () {
          resolve(null);
        }
      );
    }
  });
}

export function calculateDistance(pointA, pointB) {
  const meters = getDistance(pointA, pointB);

  return Number.parseFloat(meters * 0.000621371).toFixed(2);
}
