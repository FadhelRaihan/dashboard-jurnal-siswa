import api from './api';

class TeoriService {
    constructor() {
        this.entity = 'teori';
        this.idField = 'idTeori';
    }

    // Get all Teori
    async getAll() {
        try {
            const response = await api.getAll(this.entity);
            if (response.status && response.data) {
                return response;
            }
            return [];
        } catch (error) {
            console.error('Error fetching all teori:', error);
            return [];
        }
    }

    // Add new teori
    async add(teoriData) {
        try {
            const response = await api.add(this.entity, {
                idTeori: teoriData.idTeori,
                title: teoriData.title,
                desc: teoriData.desc,
                icon: teoriData.icon,
                sumber: teoriData.sumber
            });

            return {
                success: response.status,
                message: response.message,
                data: response.data
            };
        } catch (error) {
            console.error('Error adding teori:', error);
            return { success: false, message: 'Gagal menambahkan data teori' };
        }
    }

    // Update teori
    async update(idTeori, updatedData) {
        try {
            const response = await api.update(this.entity, this.idField, idTeori, {
                title: updatedData.title,
                desc: updatedData.desc,
                icon: updatedData.icon,
                sumber: updatedData.sumber,

            });

            return {
                success: response.status,
                message: response.message
            };
        } catch (error) {
            console.error(`Error updating teori with idteori ${idTeori}:`, error);
            return { success: false, message: 'Gagal mengupdate data teori' };
        }
    }

    // Delete teori
    async delete(idTeori) {
        try {
            const response = await api.delete(this.entity, this.idField, idTeori);
            return {
                success: response.status,
                message: response.message
            };
        } catch (error) {
            console.error(`Error deleting teori with idteori ${idTeori}:`, error);
            return { success: false, message: 'Gagal menghapus data teori' };
        }
    }
}

export default new TeoriService();