// src/services/api.js - VERSION YANG BENAR
class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    if (!this.baseURL) {
      console.error('VITE_GOOGLE_SCRIPT_URL is not defined!');
    }
  }

  // Generic request method - TANPA no-cors untuk GET
  async request(action, entity, params = {}) {
    const formData = new URLSearchParams();
    formData.append('action', action);
    formData.append('entity', entity);

    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });

    try {
      // HAPUS mode: 'no-cors' - ini yang menyebabkan masalah!
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });

      // Cek response status
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Baca response sebagai text dulu untuk debugging
      const textResponse = await response.text();
      // console.log('Raw response:', textResponse);

      // Parse JSON
      try {
        const jsonResponse = JSON.parse(textResponse);
        return jsonResponse;
      } catch (e) {
        console.error('Failed to parse JSON:', textResponse);
        return { status: false, message: 'Invalid JSON response' };
      }
    } catch (error) {
      console.error(`Error in ${action} for ${entity}:`, error);
      throw error;
    }
  }

  // Shortcut methods
  async add(entity, data) {
    return this.request('add', entity, data);
  }

  async getAll(entity, params = {}) {
    return this.request('get', entity, params);
  }

  async getDetail(entity, id) {
    console.log(id);

    return this.request('get', entity, id)
  };


  async update(entity, idField, idValue, data) {
    return this.request('update', entity, {
      [idField]: idValue,
      ...data
    });
  }

  async delete(entity, idField, idValue) {
    return this.request('delete', entity, {
      [idField]: idValue
    });
  }

  async import(entity, data) {
    try {
      const formData = new URLSearchParams();
      formData.append('action', 'import');
      formData.append('entity', entity);
      // Backend Google Apps Script mengharapkan parameter 'data' dibungkus sebagai 
      // JSON string dari sebuah objek yang memiliki field 'data' berisi stringified array data siswa.
      formData.append('data', JSON.stringify({ data: JSON.stringify(data) }));

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Kembali ke format standar GAS
        },
        body: formData.toString()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textResponse = await response.text();
      return JSON.parse(textResponse);
    } catch (error) {
      console.error(`Error in import for ${entity}:`, error);
      throw error;
    }
  }
}

export default new ApiService();