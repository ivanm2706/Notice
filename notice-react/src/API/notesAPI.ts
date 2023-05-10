import { Note } from "../types/Note";
import { openDatabase, storeName } from "./helperAPI";

export const notesAPI = {
  async getAll(): Promise<Note[]> {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const getAllRequest = store.getAll();

      const result = await new Promise<Note[]>((resolve, reject) => {
        getAllRequest.onsuccess = () => {
          resolve(getAllRequest.result);
        };

        transaction.oncomplete = () => {
          db.close();
        };

        transaction.onerror = () => {
          reject(new Error('Error getAll Notes'));
          db.close();
        }
      });

      return result;
    } catch (error) {
      throw new Error('Error getAll Notes');
    }
  },
  async add(newNote: Note): Promise<void> {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const addRequest = store.add(newNote);

      await new Promise<void>((resolve, reject) => {
        addRequest.onsuccess = () => {
          resolve();
        };

        addRequest.onerror = function() {
          reject(new Error('Error add note'));
          db.close();
        };
      });

      db.close();
    } catch (error) {
      throw new Error('Error add note');
    }
  },
  async delete(id: number): Promise<void> {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const deleteRequest = store.delete(id);

      await new Promise<void>((resolve, reject) => {
        deleteRequest.onsuccess = () => {
          resolve();
        };

        deleteRequest.onerror = function() {
          reject(new Error('Error delete note'));
          db.close();
        };
      });

      db.close();
    } catch (error) {
      throw new Error('Error delete note');
    }
  },
  async change(id: number, newData: Pick<Note, 'title' | 'text' | 'lock'>): Promise<void> {
  const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const data = getRequest.result;

        if (data) {
          const updatedData = { ...data, ...newData };
          const putRequest = store.put(updatedData);

          putRequest.onsuccess = () => {
            resolve();
          };

          putRequest.onerror = () => {
            reject('error updated note');
          };
        }
      };

      getRequest.onerror = () => {
        reject('error updated note');
        db.close();
      };

      transaction.oncomplete = () => {
        db.close();
      };

      transaction.onerror = () => {
        db.close();
        reject();
      }
    });
  }
};