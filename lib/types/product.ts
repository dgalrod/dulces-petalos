export type FertilizerType = "phosphorus" | "nitrogen";

export interface Product {
  id: string;
  name: string;
  binomialName: string;
  price: number;
  imgUrl: string;
  wateringsPerWeek: number;
  fertilizerType: FertilizerType;
  heightInCm: number;
}
