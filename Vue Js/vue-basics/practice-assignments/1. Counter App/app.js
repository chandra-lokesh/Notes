const app = Vue.createApp({
    data(){
        return{
            "counter": 0
        };
    },
    methods:{
        increase(){
            this.counter += 1;
        },
        decrease(){
            if(this.counter === 0)
                return;
            this.counter -= 1;
        }
    }
});

app.mount("#container")