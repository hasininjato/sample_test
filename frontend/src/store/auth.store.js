import { defineStore } from "pinia";
import api from "../utils/call";


export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),

    actions: {
        async login(email, password) {
            console.log(email, password)
            try {
                const user = await api("auth/login", {
                    method: "POST",
                    body: { email, password },
                });

                // update pinia state
                this.user = user;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                console.log("error", error)
            }
        }
    },
});