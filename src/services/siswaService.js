// src/services/siswaService.js
import api from './api';

class SiswaService {
  constructor() {
    this.entity = 'siswa';
    this.idField = 'NISN';
  }

  // Get all siswa
  async getAll(page = 1, limit = 10, keyword = "", idSekolah = "", idKelas = "") {
    try {
      const response = await api.getAll(this.entity, {
        page: page,
        limit: limit,
        keyword: keyword,
        idSekolah: idSekolah,
        idKelas: idKelas,
      });
      if (response.status && response.data) {
        return response;
      }
      return [];
    } catch (error) {
      console.error('Error fetching all siswa:', error);
      return [];
    }
  }

  // Get siswa by NISN
  async getById(NISN) {
    try {
      const response = await api.getById(this.entity, this.idField, NISN);
      if (response.status && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching siswa with NISN ${NISN}:`, error);
      return null;
    }
  }

  // Add new siswa
  async add(siswaData) {
    try {
      const response = await api.add(this.entity, {
        idSekolah: siswaData.idSekolah,
        idKelas: siswaData.idKelas,
        namaLengkap: siswaData.namaLengkap,
        jenisKelamin: siswaData.jenisKelamin,
        NISN: siswaData.NISN
      });

      return {
        success: response.status,
        message: response.message,
        data: response.data
      };
    } catch (error) {
      console.error('Error adding siswa:', error);
      return { success: false, message: 'Gagal menambahkan data siswa' };
    }
  }

  // Update siswa
  async update(NISN, updatedData) {
    try {
      const response = await api.update(this.entity, this.idField, NISN, {
        idSekolah: updatedData.idSekolah,
        idKelas: updatedData.idKelas,
        namaLengkap: updatedData.namaLengkap,
        jenisKelamin: updatedData.jenisKelamin
      });

      return {
        success: response.status,
        message: response.message
      };
    } catch (error) {
      console.error(`Error updating siswa with NISN ${NISN}:`, error);
      return { success: false, message: 'Gagal mengupdate data siswa' };
    }
  }

  // Delete siswa
  async delete(NISN) {
    try {
      const response = await api.delete(this.entity, this.idField, NISN);
      return {
        success: response.status,
        message: response.message
      };
    } catch (error) {
      console.error(`Error deleting siswa with NISN ${NISN}:`, error);
      return { success: false, message: 'Gagal menghapus data siswa' };
    }
  }

  async deleteByClass(idSekolah, idKelas) {
    try {
      // Kita asumsikan endpoint action di backend adalah 'deleteByClass'
      const response = await api.request('deleteByClass',this.entity, {
        action: 'deleteByClass',
        idSekolah: idSekolah,
        idKelas: idKelas
      });

      return {
        success: response.status,
        message: response.message
      };
    } catch (error) {
      console.error(`Error deleting class ${idKelas}:`, error);
      return { success: false, message: 'Gagal menghapus data satu kelas' };
    }
  }

  // Search siswa by name
  async searchByName(keyword) {
    const allSiswa = await this.getAll();
    return allSiswa.filter(siswa =>
      siswa.namaLengkap.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // Get siswa by class
  async getByClass(idKelas) {
    const allSiswa = await this.getAll();
    return allSiswa.filter(siswa => siswa.idKelas === idKelas);
  }

  // Get siswa by school
  async getBySchool(idSekolah) {
    const allSiswa = await this.getAll();
    return allSiswa.filter(siswa => siswa.idSekolah === idSekolah);
  }

  // Tambahkan metode ini di dalam class SiswaService
  async importBulk(payload) {
    try {
      // Payload adalah array of objects dari modal import
      const response = await api.import(this.entity, payload);

      return {
        success: response.status,
        message: response.message,
        results: response.data // Berisi successCount, failCount, dsb dari backend
      };
    } catch (error) {
      console.error('Error bulk importing siswa:', error);
      return {
        success: false,
        message: 'Terjadi kesalahan jaringan saat proses import'
      };
    }
  }
}

export default new SiswaService();