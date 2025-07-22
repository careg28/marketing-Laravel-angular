import { PackageFeature } from "./package-feature.model";

export interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  features: PackageFeature[];
}
