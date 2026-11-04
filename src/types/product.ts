export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  details: string[];
  fabric: string;
  fit: string;
  price: number;
  originalPrice?: number;
  category: "tees" | "hoodies" | "pants" | "accessories" | "jackets";
  tags: string[];
  badge?: "NEW DROP" | "BESTSELLER" | "LIMITED" | "SALE";
  colors: ProductColor[];
  sizes: {
    size: ProductSize;
    inStock: boolean;
  }[];
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item id e.g. `${product.id}-${selectedColor}-${selectedSize}`
  productId: string;
  name: string;
  slug: string;
  price: number;
  selectedColor: string;
  selectedColorHex: string;
  selectedSize: ProductSize;
  image: string;
  quantity: number;
}

