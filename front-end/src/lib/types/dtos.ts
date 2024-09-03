export type Commodity = {
  id: string;
  name: string;
  varieties: Variety[];
};

export type Variety = {
  id: string;
  name: string;
};

export type Grower = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  farms: Farm[];
};

export type Farm = {
  id: string;
  name: string;
  address: string;
};

export type Client = {
  id: string;
  name: string;
  lastName: string;
  email: string;
};

export type Harvest = {
  id: string;
  grower: Omit<Grower, "farms">;
  farm: Farm;
  client: Client;
  commodity: Omit<Commodity, "varieties">;
  variety: Variety;
  createdAt: string;
};

export type CommodityListResponse = {
  commodities: Commodity[];
  count: number;
};

export type CommodityResponse = {
  commodity: Commodity;
};

export type GrowerListResponse = {
  growers: Grower[];
  count: number;
};

export type GrowerResponse = {
  grower: Grower;
};

export type ClientListResponse = {
  clients: Client[];
  count: number;
};

export type ClientResponse = {
  client: Client;
};

export type HarvestListResponse = {
  harvests: Harvest[];
  count: number;
};

export type HarvestResponse = {
  harvest: Harvest;
};

export type ClientRequest = {
  name: string;
  lastName: string;
  email: string;
};

export type GrowerRequest = {
  name: string;
  lastName: string;
  email: string;
  farms: {
    name: string;
    address: string;
  }[];
};

export type CommodityRequest = {
  name: string;
  varieties: {
    name: string;
  }[];
};

export type HarvestRequest = {
  growerId: string;
  farmId: string;
  clientId: string;
  commodityId: string;
  varietyId: string;
  quantity: number;
};
