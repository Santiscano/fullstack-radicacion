export interface IsLoadingType {
  preLoad?: boolean;
  setPreLoad: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
