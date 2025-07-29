const app = Vue.createApp({
    data(){
        return {
            currentId: 1,
            newItem: "",
            list: []
        };
    },
    methods:{
        addToDoItem(){
            this.list.push({
                id: this.currentId++,
                content: this.newItem
            });
            this.newItem = "";
        },
        deleteTodoItem(id){
            const itemIdx = this.list.findIndex(i => i.id === id);
            if(itemIdx != -1)
                this.list.splice(itemIdx, 1);
        }
    }
});

app.mount("#main");