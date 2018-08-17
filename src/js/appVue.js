
var msg = new Vue({
    el: '#app',
    data: {
        message: 'Hello VueJs'
    }
})

var msg2 = new Vue({
    el: '#app2',
    data: {
        message: 'You loaded this page on ' + new Date().toLocaleString()
    }
})

var msg3 = new Vue({
    el: '#app3',
    data: {
        seen: false
    }
})

var app4 = new Vue({
    el: '#app4',
    data: {
        todos: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue' },
            { text: 'Build something awesome' }
        ]
    }
})

var app6 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})