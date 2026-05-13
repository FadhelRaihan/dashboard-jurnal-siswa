import api from './api';

class AngketSiswaService {
    constructor() {
        this.entity = 'angketSiswa';
    }

    /**
     * Menyimpan hasil angket ke Google Sheets
     * @param {Object} formData - Harus berisi idSekolah, idKelas, nisn, namaSiswa, dan p1-p27
     */
    async submit(formData) {
        try {
            const response = await api.request('submit', this.entity, formData);
            console.log(formData);
            return {
                success: response.status,
                message: response.message,
                data: response.data
            };
        } catch (error) {
            console.error('Error submitting angket:', error);
            return { success: false, message: 'Gagal mengirim data ke server' };
        }
    }

    /**
     * Mengambil history angket (jika diperlukan di masa depan)
     */
    async getHistory(params = {}) {
        try {
            const response = await api.request('get', this.entity, params);
            return response;
        } catch (error) {
            console.error('Error fetching history:', error);
            return { status: false, message: 'Gagal mengambil data history' };
        }
    }
}

export default new AngketSiswaService();