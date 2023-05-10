import { API_KEY, getAllTableFields, getIDDataBase, getIDDataForm } from "./helper";

export const fetchNotes = {
  async getAll() {
    try {
      const KEY_APP = await getIDDataBase();
      const KEY_FORM = await getIDDataForm(KEY_APP);
      await getAllTableFields(KEY_APP, KEY_FORM);
  
      const response = await fetch(`https://quintadb.com/apps/${KEY_APP}/dtypes/entity/${KEY_FORM}.json?rest_api_key=${API_KEY}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        const data = await response.json();
        return data.records;
    } catch {
      throw new Error('error getAll fields');
    }
  }
};
