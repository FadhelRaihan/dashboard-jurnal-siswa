import api from './api';

class RekapBulananService {
  constructor() {
    this.entity = 'rekapBulanan';
  }

  /**
   * Mengambil data rekap mingguan bertingkat (W1-W4)
   * @param {Object} params - { idSekolah, idKelas, bulan, tahun }
   */
  async getRekapMingguan(params) {
    try {
      const response = await api.request('getRekapMingguan', this.entity, {
        idSekolah: params.idSekolah,
        idKelas: params.idKelas,
        bulan: params.bulan,
        tahun: params.tahun
      });

      return response;
    } catch (error) {
      console.error('Error fetching rekap mingguan:', error);
      return {
        status: false,
        message: 'Gagal menghubungi server rekapitulasi',
        data: []
      };
    }
  }

  async getRekapKetercapaian(params) {
    try {
      const response = await api.request('getRekapKetercapaian', this.entity, {
        idSekolah: params.idSekolah,
        idKelas: params.idKelas,
        bulan: params.bulan,
        tahun: params.tahun
      });

      return response;
    } catch (error) {
      console.error('Error fetching rekap ketercapaian:', error);
      return {
        status: false,
        message: 'Gagal menghubungi server rekapitulasi',
        data: []
      };
    }
  }

  /**
   * Jika Anda butuh rekap bulanan versi filter (Jan-Apr) yang sebelumnya
   */
  async getRekapByFilter(params) {
    try {
      return await api.request('getRekapByFilter', this.entity, params);
    } catch (error) {
      return { status: false, message: 'Gagal memuat filter rekap', data: [] };
    }
  }

  async getDetailJurnalSiswa(params){
    try{
      const ress = await api.request('getDetail', this.entity, params);

      return ress  
    }catch{
      return { status: false, message: 'Gagal memuat detail rekap', data: [] };
    }
  }

}

export default new RekapBulananService();