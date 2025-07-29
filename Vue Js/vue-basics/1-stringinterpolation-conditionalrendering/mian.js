const app = Vue.createApp({
    data(){
        return {
            count : 0,
            isLoggedIn: false,
            link: "https://google.com",
            person: {
                name: "chandra",
                mobile: "9849194924",
                town: "IBP",
                country: "India"
            },
            posts: [
                {
                    id: 1,
                    title: 'sample title 1'
                },
                {
                    id: 2,
                    title: 'sample title 2'
                },
                {
                    id: 3,
                    title: 'sample title 3'
                }
            ]
        }
    }, 
    methods: {
        checkLogin(name){
            console.log(name);
            this.isLoggedIn = !this.isLoggedIn;
        }
    }
});

app.mount("#app");