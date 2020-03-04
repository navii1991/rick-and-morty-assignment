export interface FilterOpt {
    species: Option[];
    gender: Option[];
    origin: Option[];
  }
  
interface Option {
    label: string;
    selected: boolean;
    controlName: string;
  }