export interface Character {
    id: number; 
    name: string; 
    status: string; 
    species: string;
    gender: string;
    image: string;
    created: string;
    origin: Location;
    lastLocation: Location;
    episode: []
}

export interface Location {
    name: string;
    url: string
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}