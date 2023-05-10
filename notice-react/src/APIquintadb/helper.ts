export const API_KEY = 'ddS0jgBZ1dU4kgmW1WWOmD';
export const dbName = 'NotesDatabase';
export const storeName = 'NotesStore';

interface Db {
  name: string,
  id: string,
}

const createDataBase = async () => {
  try {
    const response = await fetch(`https://quintadb.com/apps.json?rest_api_key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        database_name: dbName,
        form_name: storeName,
      }),
    });

    const data = await response.json();
    return await data.databases[0].id;
  } catch {
    throw new Error('error')
  }
}

const createForm = async (KEY_APP: string) => {
  try {
    const response = await fetch(`https://quintadb.com/apps/${KEY_APP}/entities.json?rest_api_key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: storeName,
      }),
    });

    const data = await response.json();

    return await data.form.id;
  } catch {
    throw new Error('error')
  }
}

export const getIDDataBase = async (): Promise<string> => {
  try {
    const response = await fetch(`https://quintadb.com/apps.json?rest_api_key=${API_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data: Db[] = await response.json().then((dat) => {

      return dat.databases});
    const [dbcurrent] = await data.filter((db) => db.name === dbName);

    if (!dbcurrent) {
      return createDataBase();
    }
    
    return dbcurrent.id;
  } catch {
    throw new Error('error can`t get id DB')
  }
};

export const getIDDataForm = async (KEY_APP: string) => {
  try {
    const response = await fetch(`https://quintadb.com/apps/${KEY_APP}/entities.json?rest_api_key=${API_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data: Db[] = await response.json().then(({ forms }) => forms);
    const [currForm] = data.filter(({ name }) => name === storeName);
  
    if (!currForm) {
      return createForm(KEY_APP);
    }
    
    return currForm.id;
  } catch {
      throw new Error('error');
  }
};

const fields = [{
  name: 'title',
  type_name: 'string',
  default: 'Title note...',
}, {
  name: 'text',
  type_name: 'string',
  default: 'Body note...',
}, {
  name: 'lock',
  type_name: 'boolean',
  default: false,
}, {
  name: 'date',
  type_name: 'date',
  default: 'today',
}];


const createdTableFields = async (KEY_APP: string, KEY_FORM: string) => {
  try {
    const fieldsAPI: object[] = [];

    fields.forEach(async (fieldBody) => {
      const response = await fetch(`https://quintadb.com/apps/${KEY_APP}/entities/${KEY_FORM}/properties.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...fieldBody, 'rest_api_key': API_KEY }),
      });

      const data = await response.json();
      console.log(data);

      if (data.field) {
        fieldsAPI.push(data.field);
      }
    });

    return fieldsAPI;
  } catch {
    throw new Error('error create fields');
  }
};

export const getAllTableFields = async (KEY_APP: string, KEY_FORM: string) => {
  try {
    const response = await fetch(`https://quintadb.com/apps/${KEY_APP}/entities/${KEY_FORM}/properties.json?rest_api_key=${API_KEY}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();

      if (data.fields.length === 0) {
        return createdTableFields(KEY_APP, KEY_FORM);
      }

      return data.fields;
  } catch {
    throw new Error('error create fields');
  }
};
