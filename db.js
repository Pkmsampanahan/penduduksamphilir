const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzl4pNhd6oBLvb8VS0JHSw77qNd_hXQCFdRrUSBe0iZnn2sVKYsbdgeHgFcDGRx-0wO/exec";

const DB = {
    async getData() {
        try {
            const response = await fetch(`${GAS_WEB_APP_URL}?action=getData`);
            return await response.json();
        } catch (error) {
            return { status: "error", message: error.message };
        }
    },

    async login(username, password) {
        const body = new URLSearchParams({ action: "login", username, password });
        return await this.postRequest(body);
    },

    async register(username, password, nama) {
        const body = new URLSearchParams({ action: "register", username, password, nama });
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
            return { status: "error", message: "Gagal terhubung ke server." };
        }
    }
};
