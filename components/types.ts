export interface Project {
  id: string;
  collectionId: string;
  image: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
}

export interface Article {
  id: string;
  created: string;
  title_en: string;
  title_pt: string;
  content_en: string;
  content_pt: string;
} 
