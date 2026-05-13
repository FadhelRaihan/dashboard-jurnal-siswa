import api from './api';

class JurnalKaihService {
    constructor() {
        this.entity = 'jurnalKaih';
    }

    /**
     * Submit jurnal harian
     * @param {Object} data - Objek datar yang sudah di-flatten
     */
    async submit(data) {
        try {
            const response = await api.request('submit', this.entity, data);
            return {
                success: response.status,
                message: response.message,
                data: response.data
            };
        } catch (error) {
            console.error('Error submitting jurnal kaih:', error);
            return { success: false, message: 'Gagal mengirim jurnal ke server' };
        }
    }

    /**
     * Mengambil riwayat jurnal berdasarkan NISN dan/atau Tanggal
     */
    async getHistory(params = {}) {
        try {
            return await api.request('get', this.entity, params);
        } catch (error) {
            console.error('Error fetching jurnal history:', error);
            return { status: false, message: 'Gagal mengambil data riwayat' };
        }
    }
}

export default new JurnalKaihService();