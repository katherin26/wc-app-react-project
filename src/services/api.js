"use strict";

import axios from "axios";

const BASE_API = "https://refugerestrooms.org/api//v1/restrooms";
const MAX_CONSECUTIVE_CALLS = 3;

export async function search({ query, ada, unisex, changingTable, page = 1 }) {
  const params = {
    query,
    page,
    per_page: 100,
  };
  const records = [];

  try {
    if (ada) params.ada = true;
    if (unisex) params.unisex = true;

    let callCount = 0;

    while (records.length < 3 && callCount <= MAX_CONSECUTIVE_CALLS) {
      const response = await axios.get(`${BASE_API}/search`, {
        headers: { Accept: "application/json" },
        params,
      });

      if (changingTable)
        response.data = response.data.filter((r) => r.changing_table);

      records.push(...response.data);
      params.page++;
      callCount++;
    }

    return { nextPage: params.page, records };
  } catch (e) {
    console.error(`${e}`);
    return { nextPage: params.page, records };
  }
}

export async function searchByCoordinates({
  lat,
  lng,
  ada,
  unisex,
  changingTable,
  page = 1,
}) {
  const params = {
    lat,
    lng,
    page,
    per_page: 100,
  };
  const records = [];

  try {
    if (ada) params.ada = true;
    if (unisex) params.unisex = true;

    let callCount = 0;

    while (records.length < 3 && callCount <= MAX_CONSECUTIVE_CALLS) {
      const response = await axios.get(`${BASE_API}/by_location`, {
        headers: { Accept: "application/json" },
        params,
      });

      if (changingTable)
        response.data = response.data.filter((r) => r.changing_table);

      records.push(...response.data);
      params.page++;
      callCount++;
    }

    return { nextPage: params.page, records };
  } catch (e) {
    console.error(`${e}`);
    return { nextPage: params.page, records };
  }
}
