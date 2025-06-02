export interface Tag {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  tags: Tag[];
}

export interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}