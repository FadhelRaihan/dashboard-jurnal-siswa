import api from './api';

class SocialDesirabilityService {
    constructor() {
        this.entity = 'socialDesirability';
    }

    async getAll(params) {
        try {
            const response = await api.getAll(this.entity, {
                idSekolah : params.idSekolah,
                idKelas : params.idKelas,
                tahun : params.tahun,
                bulan : params.bulan,
            });
            if (response.status && response.data) {
                return response;
            }
            return [];
        } catch (error) {
            console.error('Error fetching Social Desirability:', error);
            return [];
        }
    }
}


export default new SocialDesirabilityService();