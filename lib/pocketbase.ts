import PocketBase from 'pocketbase';
import 'dotenv/config';

export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

interface ProjectData {
  title_en: string;
  title_pt: string;
  description_en: string;
  description_pt: string;
  image: File;
}

interface ArticleData {
  title_en: string;
  title_pt: string;
  content_en: string;
  content_pt: string;
}

export const getProjects = async () => {
  try {
    return await pb.collection('projects').getFullList({
      sort: '-created',
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getArticles = async () => {
  try {
    return await pb.collection('articles').getFullList({
      sort: '-created',
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const createProject = async (formData: FormData) => {
  const data = {
    title_en: formData.get('title_en'),
    title_pt: formData.get('title_pt'),
    description_en: formData.get('description_en'),
    description_pt: formData.get('description_pt'),
    image: formData.get('image')
  };
  
  return await pb.collection('projects').create(data);
};

export const createArticle = async (data: ArticleData) => {
  try {
    return await pb.collection('articles').create(data);
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};
