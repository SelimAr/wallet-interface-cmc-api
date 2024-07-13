export type DataList = {
    name: string;
    symbol: string;
    slug: string;
    id: number;
    circulating_supply: number;
    total_supply: number;
    quote: {
      USD: {
        price: number;
        volume_24h: number;
      };
    };
  };