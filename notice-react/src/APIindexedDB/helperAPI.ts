const dbName = 'NotesDatabase';
export const storeName = 'NotesStore';

export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function() {
      const db = request.result;
      db.createObjectStore(storeName, { keyPath: "id" });
    };

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };
  });
}