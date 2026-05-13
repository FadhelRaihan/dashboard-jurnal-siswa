import api from './api';

class SekolahService {
    constructor() {
        this.entity = 'sekolah';
        this.idField = 'idSekolah';
    }

    // Get all sekolah
    async getAll(page = 1, limit = 10, keyword = "") {
        try {
            const response = await api.getAll(this.entity, {
                page: page,
                limit: limit,
                keyword: keyword
            });
            if (response.status && response.data) {
                return response.data;
            }
            return { items: [], pagination: {} };
        } catch (error) {
            console.error('Error fetching all sekolah:', error);
            return { items: [], pagination: {} };
        }
    }

    async getDropdown() {
        try {
            const response = await api.request('get', this.entity, { dropdown: 'true' });
            return response.status ? response.data : [];
        } catch (error) {
            console.error('Error fetching dropdown sekolah:', error);
            return [];
        }
    }

    async getDetail(id) {
        try {
            const response = await api.getDetail(this.entity, { idSekolah: id });
            if (response.status && response.data) {
                return response;
            }
            return [];
        } catch (error) {
            console.error('Error fetching detail sekolah:', error);
            return [];
        }
    }

    async add(sekolahData) {
        try {
            const response = await api.add(this.entity, {
                idSekolah: sekolahData.idSekolah,
                namaSekolah: sekolahData.namaSekolah,
                NPSN: sekolahData.NPSN,
                NSS: sekolahData.NSS,
                alamatSekolah: sekolahData.alamatSekolah,
                desa: sekolahData.desa,
                kecamatan: sekolahData.kecamatan,
                kabupaten: sekolahData.kabupaten,
                provinsi: sekolahData.provinsi,
                kodePos: sekolahData.kodePos,
                website: sekolahData.website,
                email: sekolahData.email,
                kepalaSekolah: sekolahData.kepalaSekolah,
                NIPKepalaSekolah: sekolahData.NIPKepalaSekolah,
            });

            return {
                success: response.status,
                message: response.message,
                data: response.data
            };
        } catch (error) {
            console.error('Error adding Sekolah:', error);
            return { success: false, message: 'Gagal menambahkan data Sekolah' };
        }
    }

    // Update Sekolah
    async update(idSekolah, updatedData) {
        try {
            const response = await api.update(this.entity, this.idField, idSekolah, {
                namaSekolah: updatedData.namaSekolah,
                NPSN: updatedData.NPSN,
                NSS: updatedData.NSS,
                alamatSekolah: updatedData.alamatSekolah,
                desa: updatedData.desa,
                kecamatan: updatedData.kecamatan,
                kabupaten: updatedData.kabupaten,
                provinsi: updatedData.provinsi,
                kodePos: updatedData.kodePos,
                website: updatedData.website,
                email: updatedData.email,
                kepalaSekolah: updatedData.kepalaSekolah,
                NIPKepalaSekolah: updatedData.NIPKepalaSekolah,
            });

            console.log(updatedData);
            return {
                success: response.status,
                message: response.message
            };
        } catch (error) {
            console.error(`Error updating siswa with idSekolah ${idSekolah}:`, error);
            return { success: false, message: 'Gagal mengupdate data siswa' };
        }
    }


    // Delete Sekolah
    async delete(idSekolah) {
        try {
            const response = await api.delete(this.entity, this.idField, idSekolah);
            return {
                success: response.status,
                message: response.message
            };
        } catch (error) {
            console.error(`Error deleting Sekolah with idSekolah ${idSekolah}:`, error);
            return { success: false, message: 'Gagal menghapus data Sekolah' };
        }
    }

}

export default new SekolahService();