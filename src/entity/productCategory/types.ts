export interface Tag {
  id: string;
  name: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  tags: string[];
}

export interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}