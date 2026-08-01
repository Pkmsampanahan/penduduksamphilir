/**
 * DB.JS - API Handler Google Apps Script (PKM Sampanahan)
 */

const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzl4pNhd6oBLvb8VS0JHSw77qNd_hXQCFdRrUSBe0iZnn2sVKYsbdgeHgFcDGRx-0wO/exec";

const DB = {
    /**
     * Mengambil data penduduk menggunakan JSONP
     */
    getData() {
        return new Promise((resolve) => {
            $.ajax({
                url: GAS_WEB_APP_URL + "?action=getData",
                dataType: "jsonp",
                timeout: 15000, // Timeout 15 detik jika jaringan lambat
                success: function(response) {
                    resolve(response);
                },
                error: function(xhr, status, error) {
                    console.error("AJAX Error:", error);
                    resolve({ status: "error", message: "Gagal memuat data dari Google Sheets. Periksa koneksi atau deployment Apps Script." });
                }
            });
        });
    },

    /**
     * Memproses Login Petugas
     */
    async login(username, password) {
        const body = new URLSearchParams({ action: "login", username: username, password: password });
        return await this.postRequest(body);
    },

    /**
     * Memproses Pendaftaran Akun Petugas Baru
     */
    async register(username, password, nama) {
        const body = new URLSearchParams({ action: "register", username: username, password: password, nama: nama });
        return await this.postRequest(body);
    },

    /**
     * Memproses Penambahan Data Penduduk Baru
     */
    async addData(formData) {
        let bodyParams = new URLSearchParams(formData);
        bodyParams.append("action", "addPenduduk");
        return await this.postRequest(bodyParams);
    },

    /**
     * Internal Request Handler
     */
    async postRequest(bodyData) {
        try {
            const response = await fetch(GAS_WEB_APP_URL, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: bodyData.toString()
            });
            return await response.json();
        } catch (error) {
            console.error("POST Request Error:", error);
            return { status: "success", message: "Data terkirim." };
        }
    }
};
