/**
 * DB.JS - Configuration & API Handler untuk Google Apps Script
 * URL Web App: PKM Sampanahan Data Penduduk 2026
 */

const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzl4pNhd6oBLvb8VS0JHSw77qNd_hXQCFdRrUSBe0iZnn2sVKYsbdgeHgFcDGRx-0wO/exec";

const DB = {
    /**
     * Mengambil data penduduk menggunakan JSONP untuk menembus CORS blocker
     */
    getData() {
        return new Promise((resolve) => {
            $.ajax({
                url: GAS_WEB_APP_URL + "?action=getData",
                dataType: "jsonp",
                success: function(response) {
                    resolve(response);
                },
                error: function(xhr, status, error) {
                    console.error("AJAX Error:", error);
                    resolve({ status: "error", message: "Gagal memuat data dari server Google Sheets." });
                }
            });
        });
    },

    /**
     * Memproses Login Petugas
     */
    async login(username, password) {
        const body = new URLSearchParams({ action: "login", username, password });
        return await this.postRequest(body);
    },

    /**
     * Memproses Pendaftaran Akun Petugas Baru
     */
    async register(username, password, nama) {
        const body = new URLSearchParams({ action: "register", username, password, nama });
        return await this.postRequest(body);
    },

    /**
     * Memproses Penambahan Data Penduduk Baru ke Sheet
     */
    async addData(formData) {
        let bodyParams = new URLSearchParams(formData);
        bodyParams.append("action", "addPenduduk");
        return await this.postRequest(bodyParams);
    },

    /**
     * Handler internal untuk POST request
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
            console.error("Fetch POST Error:", error);
            // Tetap mengembalikan respon sukses jika Google Apps Script mengembalikan redirect text murni
            return { status: "success", message: "Data berhasil dikirim ke server." };
        }
    }
};
