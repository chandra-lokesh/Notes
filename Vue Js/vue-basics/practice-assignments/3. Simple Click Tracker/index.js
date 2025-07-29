const app = Vue.createApp({
    data(){
        return{
            counters: [
                {id: 1, counter: 0},
                {id: 2, counter: 0},
                {id: 3, counter: 0},
                {id: 4, counter: 0},
                {id: 5, counter: 0},
                {id: 6, counter: 0}
            ]
        };
    },
    methods:{
        handleClick(id){
            this.counters.find(i => i.id === id).counter++;
        }
    }
});

app.mount("#main")