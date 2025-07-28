const app = Vue.createApp({
    data(){
        return{
            newMovie: "",
            idCounter: 1,
            favMovies:[
                {id: 0, name: "Martian", likes: 10}
            ]
        }
    },
    methods: {
        addLike(id){
            this.favMovies.find(i => i.id === id).likes++;
        },
        addMovie(){
            if(this.newMovie.trim() === "")
                return;
            this.favMovies.push({
                id: this.idCounter++,
                name: this.newMovie,
                likes: 0
            });
            this.newMovie = "";
        }
    }
});

app.mount("#main");