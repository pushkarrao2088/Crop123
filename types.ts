
export enum UserRole {
  ADMIN = 'ADMIN',
  FARMER = 'FARMER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  ADMIN_OVERVIEW = 'ADMIN_OVERVIEW',
  PRODUCTS = 'PRODUCTS',
  SOLUTIONS = 'SOLUTIONS',
  KNOWLEDGE_GRID = 'KNOWLEDGE_GRID',
  SOIL_TEST = 'SOIL_TEST',
  BEGINNER_PLANNER = 'BEGINNER_PLANNER',
  RESOURCES = 'RESOURCES',
  HEALTH_SCAN = 'HEALTH_SCAN',
  MARKET = 'MARKET',
  ABOUT = 'ABOUT',
  YIELD_SIMULATOR = 'YIELD_SIMULATOR'
}

export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  location: string;
}

export interface CropProfile {
  name: string;
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Annual';
  duration: string;
  pests: string[];
  image: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  longDescription: string;
  benefits: string[];
  features: { title: string; desc: string }[];
}

export interface Product {
  id: string;
  name: string;
  category: 'Seeds' | 'Fertilizers' | 'Tools' | 'Pesticides' | 'Tech';
  price: number;
  description: string;
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}
