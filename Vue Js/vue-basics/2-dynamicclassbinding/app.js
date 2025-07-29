const app = Vue.createApp({
    data(){
        return{
            activeClass: false,
            // boxActiveClasses: {
            //     box: true,
            //     active: false
            // }
        }
    },
    watch:{
        // activeClass(){
        //     this.boxActiveClasses.active = this.activeClass;
        // }
    },
    methods: {
        handleClick(){
            this.activeClass = !this.activeClass;
        },
        boxActiveClasses(){
            return {
                box: true,
                active: this.activeClass
            }
        }
    }
});

app.mount("#app")