import { Note } from "../../types/note";
import { databases, collections, CollectionNames } from "./config";
import { ID } from "appwrite";

type CollectionModels = {
  notes: Note;
};

type DatabaseMethods<T> = {
  create: (payload: Omit<T, "$id">, id?: string) => Promise<T>;
  update: (id: string, payload: Partial<Omit<T, "$id">>) => Promise<T>;
  delete: (id: string) => Promise<object>;
  get: (id: string) => Promise<T>;
  list: (queries?: string[]) => Promise<T[]>;
};

type DatabaseService = {
  [K in CollectionNames]: DatabaseMethods<CollectionModels[K]>;
};

interface AppwriteNote {
  $id: string;
  body: string;
  colors: string;
  position: string;
}

type Parser<DBModel, DomainModel> = {
  fromDB: (dbModel: DBModel) => DomainModel;
  toDB: (domainModel: Partial<DomainModel>) => Partial<DBModel>;
};

const parsers: {
  [K in CollectionNames]?: Parser<any, CollectionModels[K]>;
} = {
  notes: {
    fromDB: (note: AppwriteNote): Note => {
      let body;
      try {
        body = JSON.parse(note.body);
      } catch {
        body = note.body;
      }
      
      return {
        $id: note.$id,
        body: body,
        colors: JSON.parse(note.colors),
        position: JSON.parse(note.position),
      };
    },
    toDB: (note: Partial<Note>): Partial<AppwriteNote> => {
      const result: Partial<AppwriteNote> = {};
      
      if (note.$id) result.$id = note.$id;
      if (note.body !== undefined) result.body = JSON.stringify(note.body);
      if (note.colors) result.colors = JSON.stringify(note.colors);
      if (note.position) result.position = JSON.stringify(note.position);
      
      return result;
    }
  }
};

const db = {} as DatabaseService;

collections.forEach((collection) => {
  type T = CollectionModels[typeof collection.name];
  const parser = parsers[collection.name];

  db[collection.name] = {
    create: async (payload, id = ID.unique()) => {
      const dbPayload = parser ? parser.toDB(payload as any) : payload;
      const result = await databases.createDocument(
        collection.dbId,
        collection.id,
        id,
        dbPayload
      );
      return parser ? parser.fromDB(result) : result as unknown as T;
    },
    update: async (id, payload) => {
      const dbPayload = parser ? parser.toDB(payload as any) : payload;
      const result = await databases.updateDocument(
        collection.dbId,
        collection.id,
        id,
        dbPayload
      );
      return parser ? parser.fromDB(result) : result as unknown as T;
    },
    delete: async (id) => {
      return await databases.deleteDocument(collection.dbId, collection.id, id);
    },
    get: async (id) => {
      const result = await databases.getDocument(
        collection.dbId,
        collection.id,
        id
      );
      return parser ? parser.fromDB(result) : result as unknown as T;
    },
    list: async (queries) => {
      const response = await databases.listDocuments(
        collection.dbId,
        collection.id,
        queries
      );
      
      return parser 
        ? response.documents.map(doc => parser.fromDB(doc)) 
        : response.documents as unknown as T[];
    },
  };
});

export { db };
