const app = Vue.createApp({
    data(){
        return {
            "inputTxt": ""
        };
    },
    computed: {
        reverseTxt(){
            return this.inputTxt.split('').reverse().join('');
        }
    }
});

app.mount("#main")