export interface Pokemon {
  id: string;
  name: string;
  image_url: string;
  types: string[];
  encountered: boolean;
  captured: boolean;
}

export interface Type {
  id: string;
  name: string;
  image: string;
  englishName: string;
}
