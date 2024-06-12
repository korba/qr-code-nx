export interface IProduct {
    id: number;
    name: string;
    description: string;
  }
  
export interface IProductResolved {
    product: IProduct | null;
    error?: any;
}