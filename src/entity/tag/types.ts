export interface Tag {
  id: string;
  name: string;
  categoryId: string;
}

export interface TagState {
  tags: Tag[] | [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null;
} 