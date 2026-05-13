import api from './api';

class AuthService {
    constructor() {
        this.entity = 'auth';
        // this.idField = 'idKelas';
    }

    async loginSiswa(params) {
        try {
            const ress = await api.request('loginSiswa', this.entity, {
                idSekolah: params.idSekolah,
                idKelas: params.idKelas,
                namaLengkap: params.namaLengkap,
            });

            return ress;
        } catch (e) {
            console.error('Error login :', e);
            return { success: false, message: 'Gagal Login' };
        }
    }
}

export default new AuthService();

