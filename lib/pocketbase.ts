import PocketBase from 'pocketbase';
import 'dotenv/config';

// Base URL for PocketBase
const baseURL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://free-foreign.pockethost.io/';

/**
 * Creates a new PocketBase instance.
 * Use this for client-side and server-side interactions.
 */
export const pb = new PocketBase(baseURL);
export const createPocketBase = () => new PocketBase(baseURL);

/**
 * Initializes a PocketBase instance for server-side requests with cookie-based authStore management.
 */
export const initPocketBase = (req?: IncomingMessage, res?: ServerResponse) => {
  const pb = createPocketBase();

  // Load auth state from cookies
  pb.authStore.loadFromCookie(req?.headers?.cookie || '');

  // Sync auth state back to cookies on changes
  pb.authStore.onChange(() => {
    if (res) {
      res.setHeader('set-cookie', pb.authStore.exportToCookie());
    }
  });

  return pb;
};

// Project and Article Types
export interface Project {
  id: string;
  title_en: string;
  title_pt: string;
  description_en: string;
  description_pt: string;
  image: string;
  collectionId: string;
  created: string;
}

export interface Article {
  id: string;
  title_en: string;
  title_pt: string;
  content_en: string;
  content_pt: string;
  created: string;
}

// Fetch Projects
export const getProjects = async (
  req?: IncomingMessage,
  res?: ServerResponse
): Promise<Project[]> => {
  const pb = req && res ? initPocketBase(req, res) : createPocketBase();

  try {
    return await pb.collection<Project>('projects').getFullList({
      sort: '-created',
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Fetch Articles
export const getArticles = async (
  req?: IncomingMessage,
  res?: ServerResponse
): Promise<Article[]> => {
  const pb = req && res ? initPocketBase(req, res) : createPocketBase();

  try {
    return await pb.collection<Article>('articles').getFullList({
      sort: '-created',
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

// Create Project
export const createProject = async (formData: FormData): Promise<Project> => {
  const pb = createPocketBase();

  const data = {
    title_en: formData.get('title_en') as string,
    title_pt: formData.get('title_pt') as string,
    description_en: formData.get('description_en') as string,
    description_pt: formData.get('description_pt') as string,
    image: formData.get('image') as File,
  };

  try {
    return await pb.collection<Project>('projects').create(data);
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Create Article
export const createArticle = async (data: Article): Promise<Article> => {
  const pb = createPocketBase();

  try {
    return await pb.collection<Article>('articles').create(data);
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};
