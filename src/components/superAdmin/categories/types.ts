export interface EachCard {
  id: number;
  genreName?: string;
  image?: EachImage;
  categoryName?: string;
  subCategoryName?: string;
  screenGroupName?: string;
  screenGroupImage?: EachImage;
  screenImages?: EachImage[];
  screenImagesCount?: number;
  description?: string | null;
  name?: string;
  pairingCode?: string;
  screenName?: string;
  tags?: string[];
  location?: string;
  city?: string;
  state?: string;
  country?: string;
  area?: string;
  images?: EachImage[];
  latitude?: number;
  longitude?: number;
  cpmValue?: string;
}
export interface EachImage {
  url: string;
  size: string;
  name: string;
  id: number | null;
}
