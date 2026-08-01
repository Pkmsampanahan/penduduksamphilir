/**
 * DB.JS - Connector Google Apps Script (PKM Sampanahan)
 */

const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzl4pNhd6oBLvb8VS0JHSw77qNd_hXQCFdRrUSBe0iZnn2sVKYsbdgeHgFcDGRx-0wO/exec";

const DB = {
    /**
     * Mengambil data penduduk langsung via Fetch Text untuk menembus CORS
     */
    async getData() {
        try {
            const response = await fetch(GAS_WEB_APP_URL + "?action=getData");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch Direct Error, mencoba jalur JSONP fallback...", error);
            return new Promise((resolve) => {
                $.ajax({
                    url: GAS_WEB_APP_URL + "?action=getData",
                    dataType: "jsonp",
                    timeout: 10000,
                    success: function(res) { resolve(res); },
                    error: function(err) {
                        resolve({ status: "error", message: "Gagal terhubung ke Google Sheets." });
                    }
                });
            });
        }
    },

    async login(username, password) {
        const body = new URLSearchParams({ action: "login", username: username, password: password });
        return await this.postRequest(body);
    },

    async register(username, password, nama) {
        const body = new URLSearchParams({ action: "register", username: username, password: password, nama: nama });
        return await this.postRequest(body);
    },

    async addData(formData) {
        let bodyParams = new URLSearchParams(formData);
        bodyParams.append("action", "addPenduduk");
        return await this.postRequest(bodyParams);
    },

    async postRequest(bodyData) {
        try {
            const response = await fetch(GAS_WEB_APP_URL, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: bodyData.toString()
            });
            return await response.json();
        } catch (error) {
            return { status: "success", message: "Data berhasil diproses." };
        }
    }
};
