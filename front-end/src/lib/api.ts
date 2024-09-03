import axios from "axios";

import type {
  CommodityListResponse,
  GrowerListResponse,
  ClientListResponse,
  HarvestListResponse,
  HarvestRequest,
  GrowerRequest,
  CommodityRequest,
  ClientRequest,
} from "./types";

const API_BASE_URL = "https://testapi.onesta.farm/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCommodities = async (page = 1) => {
  const response = await api.get<CommodityListResponse>("/commodities", {
    params: { page },
  });
  return response.data;
};

export const getHarvests = async (page = 1) => {
  const response = await api.get<HarvestListResponse>("/harvests", {
    params: { page },
  });
  return response.data;
};

export const getGrowers = async (page = 1) => {
  const response = await api.get<GrowerListResponse>("/growers", {
    params: { page },
  });
  return response.data;
};

export const getClients = async (page = 1) => {
  const response = await api.get<ClientListResponse>("/clients", {
    params: { page },
  });
  return response.data;
};

export const createHarvest = async (data: HarvestRequest) => {
  const response = await api.post("/harvests", data);
  return response.data;
};

export const createGrower = async (data: GrowerRequest) => {
  const response = await api.post("/growers", data);
  return response.data;
};

export const createCommodity = async (data: CommodityRequest) => {
  const response = await api.post("/commodities", data);
  return response.data;
};

export const createClient = async (data: ClientRequest) => {
  const response = await api.post("/clients", data);
  return response.data;
};
