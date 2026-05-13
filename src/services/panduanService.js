import api from './api';

class PanduanService {
    constructor() {
        this.entity = 'panduan';
        this.idField = 'idPanduan';
    }

    // Get all Panduan
    async getAll() {
        try {
            const response = await api.getAll(this.entity);
            if (response.status && response.data) {
                return response;
            }
            return [];
        } catch (error) {
            console.error('Error fetching all panduan:', error);
            return [];
        }
    }

    // Add new panduan
    async add(panduanData) {
        try {
            const response = await api.add(this.entity, {
                idPanduan: panduanData.idPanduan,
                title: panduanData.title,
                desc: panduanData.desc,
                icon: panduanData.icon
            });

            return {
                success: response.status,
                message: response.message,
                data: response.data
            };
        } catch (error) {
            console.error('Error adding panduan:', error);
            return { success: false, message: 'Gagal menambahkan data panduan' };
        }
    }

    // Update panduan
    async update(idPanduan, updatedData) {
        try {
            const response = await api.update(this.entity, this.idField, idPanduan, {
                title: updatedData.title,
                desc: updatedData.desc,
                icon: updatedData.icon

            });

            return {
                success: response.status,
                message: response.message
            };
        } catch (error) {
            console.error(`Error updating panduan with idPanduan ${idPanduan}:`, error);
            return { success: false, message: 'Gagal mengupdate data panduan' };
        }
    }

    // Delete panduan
    async delete(idPanduan) {
        try {
            const response = await api.delete(this.entity, this.idField, idPanduan);
            return {
                success: response.status,
                message: response.message
            };
        } catch (error) {
            console.error(`Error deleting panduan with idPanduan ${idPanduan}:`, error);
            return { success: false, message: 'Gagal menghapus data panduan' };
        }
    }
}

export default new PanduanService();