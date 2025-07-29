const app = Vue.createApp({
    data(){
        return{
            idCounter: 1,
            newName: "",
            newEmail: "",
            newRating: "",
            formList: [
            ]
        }
    },
    methods:{
        submitForm(){
            if(this.newName.trim()==="" || this.newEmail.trim()==="" || this.newRating.trim()==="")
                return;
            this.formList.push({
                id: this.idCounter++,
                name: this.newName,
                email: this.newEmail,
                rating: this.newRating
            });
            this.newName = "";
            this.newEmail = "";
            this.newRating = "";
            console.log(this.formList);
            
        }
    }
});

app.mount("#main");