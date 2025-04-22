import { Client, Databases } from "appwrite";

export type CollectionNames = "notes";

export interface Collection {
  name: CollectionNames;
  id: string;
  dbId: string;
}

export const collections: Collection[] = [
  {
    name: "notes",
    id: import.meta.env.VITE_APPWRITE_COLLECTION_NOTES_ID,
    dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  },
];

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export { client, databases };
