export interface INFTCard {
  nft: {
    media: { gateway: string }[];
    title: string;
    id: { tokenId: string };
    contract: {
      address: string; 
    };
    description?: string; 
  };
}