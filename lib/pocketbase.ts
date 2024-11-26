
import PocketBase from 'pocketbase';
import 'dotenv/config';

export const createPocketBase = () => new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

/**
 * Initializes a PocketBase instance for SSR with cookie-based authStore management.
 */
export const initPocketBase = (req, res) => {
  const pb = createPocketBase();

  // Load auth state from cookies
  pb.authStore.loadFromCookie(req?.headers?.cookie || '');

  // Sync auth state back to cookies on any change
  pb.authStore.onChange(() => {
    if (res) {
      res.setHeader('set-cookie', pb.authStore.exportToCookie());
    }
  });

  return pb;
};

export const getProjects = async (req = null, res = null) => {
  const pb = req && res ? initPocketBase(req, res) : createPocketBase();

  try {
    return await pb.collection('projects').getFullList({
      sort: '-created',
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getArticles = async (req = null, res = null) => {
  const pb = req && res ? initPocketBase(req, res) : createPocketBase();

  try {
    return await pb.collection('articles').getFullList({
      sort: '-created',
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const createProject = async (formData) => {
  const pb = createPocketBase();
  const data = {
    title_en: formData.get('title_en'),
    title_pt: formData.get('title_pt'),
    description_en: formData.get('description_en'),
    description_pt: formData.get('description_pt'),
    image: formData.get('image'),
  };

  try {
    return await pb.collection('projects').create(data);
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const createArticle = async (data) => {
  const pb = createPocketBase();

  try {
    return await pb.collection('articles').create(data);
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};
