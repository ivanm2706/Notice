import { Note } from "../types/Note";
import { API_KEY, getAllTableFields, getIDDataBase, getIDDataForm } from "./helper";

export const fetchNotesQuentaDb: {
  KEY_APP: string,
  FORM_FIELD: any[],
  KEY_FORM: string,
  KEY_TITLE: string,
  KEY_TEXT: string,
  KEY_DATE: string,
  KEY_LOCK: string,
  KEY_ID: string,

  getAll: () => Promise<Note[]>,
  add: (data: Note) => Promise<void>,
  delete: (id: number) => Promise<void>,
  change: (id: number, data: Omit<Note, 'id'>) => Promise<void>,
} = {
  KEY_APP: '',
  KEY_FORM: '',
  FORM_FIELD: [],
  KEY_TITLE: '',
  KEY_TEXT: '',
  KEY_DATE: '',
  KEY_LOCK: '',
  KEY_ID: '',

  async getAll() {
    try {
      this.KEY_APP = await getIDDataBase();
      this.KEY_FORM = await getIDDataForm(this.KEY_APP);
      this.FORM_FIELD = await getAllTableFields(this.KEY_APP, this.KEY_FORM);

      await this.FORM_FIELD.forEach(field => {
        switch (field.name) {
          case 'text':
            this.KEY_TEXT = field.id;
            break;

          case 'title':
            this.KEY_TITLE = field.id;
            break;

          case 'date':
            this.KEY_DATE = field.id;
            break;

          case 'lock':
            this.KEY_LOCK = field.id;
            break;

          case 'id':
            this.KEY_ID = field.id;
            break;
        }
      })
  
      const response = await fetch(`https://quintadb.com/apps/${this.KEY_APP}/dtypes/entity/${this.KEY_FORM}.json?rest_api_key=${API_KEY}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        const records: any[] = await response.json().then(data => data.records);

        return records.map(record => {
          return {
            title: record.values[this.KEY_TITLE],
            date: record.values[this.KEY_DATE],
            id: record.id,
            text: record.values[this.KEY_TEXT],
            lock: record.values[this.KEY_LOCK] === 'f' ? false : true,
          }
        });
    } catch {
      throw new Error('error getAll fields');
    }
  },

  async add(newData: Note) {
    try {  
      const response = await fetch(`https://quintadb.com/apps/${this.KEY_APP}/dtypes.json?rest_api_key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: {
              entity_id: this.KEY_FORM,
              [this.KEY_ID]: newData.id,
              [this.KEY_DATE]: newData.date,
              [this.KEY_TEXT]: newData.text,
              [this.KEY_TITLE]: newData.title,
              [this.KEY_LOCK]: newData.lock ? 't' : 'f',
            }
          })
        });
  
        const dataFromAPI = await response.json();
        console.log(dataFromAPI)
    } catch {
      throw new Error('error add data');
    }
  },

  async delete(id: number) {
    try {  
      const response = await fetch(`https://quintadb.com/apps/${this.KEY_APP}/dtypes/${id}.json?rest_api_key=${API_KEY}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const dataFromAPI = await response.json();
        console.log(dataFromAPI)
    } catch {
      throw new Error('error add data');
    }
  },

  async change(id: number, newData: Omit<Note, 'id'>) {
    try {  
      const response = await fetch(`https://quintadb.com/apps/${this.KEY_APP}/dtypes/${id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'rest_api_key': API_KEY,
            values: {
              [this.KEY_DATE]: newData.date,
              [this.KEY_TEXT]: newData.text,
              [this.KEY_TITLE]: newData.title,
              [this.KEY_LOCK]: newData.lock ? 't' : 'f',
            }
          })
        });

        const dataFromAPI = await response.json();
        console.log(dataFromAPI)
    } catch {
      throw new Error('error add data');
    }
  }
};
