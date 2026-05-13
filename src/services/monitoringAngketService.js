// src/services/monitoringService.js
import api from './api';

class MonitoringAngketService {
  constructor() {
    this.entity = 'monitoring';
  }

  /**
     * Mengambil data monitoring angket berdasarkan kelas dan rentang bulan
     * @param {Object} params - { idSekolah, idKelas, startMonth, endMonth, year }
     */
  async getByClass(params) {
    try {
      const response = await api.request('getByClass', this.entity, {
        idSekolah: params.idSekolah,
        idKelas: params.idKelas,
        startMonth: params.startMonth,
        endMonth: params.endMonth,
        year: params.year || new Date().getFullYear()
      });

      // Mengembalikan full response agar status & message bisa dibaca di Page
      return response;
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
      return {
        status: false,
        message: 'Terjadi kesalahan pada koneksi server',
        data: []
      };
    }
  }

}

export default new MonitoringAngketService();