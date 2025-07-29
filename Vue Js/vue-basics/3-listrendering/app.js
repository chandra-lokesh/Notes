const app = Vue.createApp({
    data(){
        return {
            test: "hello world!",
            name: "lokesh",
            firstname: "Chandra Lokesh",
            lastname: "Chary",
            country: "India",
            list: [
                {
                    id: "1",
                    name: "chandra",
                    uid: "286199"
                },
                {
                    id: "2",
                    name: "lokesh",
                    uid: "286200"
                },
                {
                    id: "3",
                    name: "chandra lokesh",
                    uid: "286201"
                }
            ]
        }
    },
    methods : {
        greeting(){
            console.log("In console");
            
            return "Hello " + this.name;
        },
        handleDelete(id){
            this.list = this.list.filter(i => i.id !== id);
        },
        onNameChange(event){
            this.name = event.target.value;
        }
    },
    computed:{
        fullName(){
            return this.firstname + " " + this.lastname;
        }
    }
})

app.mount("#app");