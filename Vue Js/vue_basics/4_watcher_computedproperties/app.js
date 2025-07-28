const app = Vue.createApp({
    data(){
        return{
            isLoggedIn: true,
            watcherMessage: "",
        }
    },
    methods: {
        handleClick(){
            this.isLoggedIn = !this.isLoggedIn;
        }
    },
    watch: {
        isLoggedIn(){
            debugger;
            if(this.isLoggedIn) this.watcherMessage = "Watcher/ User is logged In";
            else this.watcherMessage = "Watcher/ User is not logged In";
        }
    },
    computed: {
        computedMessage(){
            debugger;
            return this.isLoggedIn ? "Computed/ User is logged In" : "Computed/ User is not logged In";
        }
    }
})

app.mount(".main")