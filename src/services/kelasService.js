import api from './api';

class KelasService {
    constructor() {
        this.entity = 'kelas';
        this.idField = 'idKelas';
    }

    // Get all kelas
    async getAll() {
        try {
            const response = await api.getAll(this.entity);
            if (response.status && response.data) {
                return response;
            }
            return [];
        } catch (error) {
            console.error('Error fetching all kelas:', error);
            return [];
        }
    }

    // Add new kelas
    async add(kelasData) {
        try {
            const response = await api.add(this.entity, {
                idSekolah: kelasData.idSekolah,
                idKelas: kelasData.idKelas,
                namaWaliKelas: kelasData.namaWaliKelas,
                nipWaliKelas: kelasData.nipWaliKelas,
                kelas: kelasData.kelas,
                subKelas: kelasData.subKelas,
                semester: kelasData.semester,
                tahunAjaran: kelasData.tahunAjaran,
                tempat: kelasData.tempat,
                tanggalRapor: kelasData.tanggalRapor
            });

            return {
                success: response.status,
                message: response.message,
                data: response.data
            };
        } catch (error) {
                console.error('Error adding kelas:', error);
                return { success: false, message: 'Gagal menambahkan data kelas' };
        }
    }

    async update(idKelas,kelasData) {
        try {
             const response = await api.update(this.entity, this.idField, idKelas, {
                namaWaliKelas: kelasData.namaWaliKelas,
                nipWaliKelas: kelasData.nipWaliKelas,
                kelas: kelasData.kelas,
                subKelas: kelasData.subKelas,
                semester: kelasData.semester,
                tahunAjaran: kelasData.tahunAjaran,
                tempat: kelasData.tempat,
                tanggalRapor: kelasData.tanggalRapor
            });

            return {
                success: response.status,
                message: response.message,
                data: response.data
            };
        } catch (error) {
            console.error('Error adding kelas:', error);
            return { success: false, message: 'Gagal menambahkan data kelas' };
        }
    }


    // delete Kelas
    async delete(idKelas) {
        try {
            const response = await api.delete(this.entity, this.idField, idKelas);
            return {
                success: response.status,
                message: response.message
            };
        } catch (error) {
            console.error(`Error deleting kelas with idKelas ${idKelas}:`, error);
            return { success: false, message: 'Gagal menghapus data kelas' };
        }
    }

}

export default new KelasService();