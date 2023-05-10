import { fetchIndexedDb } from "../APIindexedDB/notesAPI";
import { fetchNotesQuentaDb } from "../APIquintadb/fetch";

export const fetchNotesSelect = process.env.REACT_APP_DB_TYPE === 'indexedDb'
  ? fetchIndexedDb
  : fetchNotesQuentaDb ;
