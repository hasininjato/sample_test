import { defineStore } from "pinia";
import axios from "axios";


export const useTransactionStore = defineStore("transactoin", {
    state: () => ({
        items: []
    }),

    actions: {
        async getItems() {
            try {
                const userLocalStorage = JSON.parse(localStorage.getItem('user'));
                const accessToken = userLocalStorage.data.access_token;
                // we also need to parse the user's id
                const userId = userLocalStorage.data.id
                const items = await axios.get(`http://localhost:8000/api/users/${userId}/transactions`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })

                this.items = items.data;
            } catch (error) {
                // catching errors
                if (error.response) {
                    throw { response: error.response };
                } else if (error.request) {
                    throw new Error("Server unavailable");
                } else {
                    throw new Error("Unexpected error")
                }
            }
        }
    },
});