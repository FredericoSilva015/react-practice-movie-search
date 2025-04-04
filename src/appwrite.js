import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const DB_ID = import.meta.env.VITE_DB_ID;
const COLLECTIONS_ID = import.meta.env.VITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);
const db = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await db.listDocuments(DB_ID, COLLECTIONS_ID, [
      Query.equal('searchTerm', searchTerm),
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await db.updateDocument(DB_ID, COLLECTIONS_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await db.createDocument(DB_ID, COLLECTIONS_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await db.listDocuments(DB_ID, COLLECTIONS_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ]);

    return result.documents;
  } catch (error) {
    console.log(error);
  }
};
