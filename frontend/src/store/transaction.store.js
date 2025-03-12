import { defineStore } from "pinia";
import axios from "axios";


export const useTransactionStore = defineStore("transactoin", {
    state: () => ({
        items: []
    }),

    actions: {
        async getItems() {
            try {
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNzgwMDk1LCJleHAiOjE3NDE3ODM2OTV9.jvJ1Bbb7T1pUAK2mNsrrKiiJtRhdP6eGpXU2fct9je8";
                const items = await axios.get("http://localhost:8000/api/users/1/transactions", {
                    headers: {
                        'Authorization': `Bearer ${token}`
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