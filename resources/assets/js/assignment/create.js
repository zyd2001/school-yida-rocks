if (window.innerWidth <= 800)
    showMessage('Please use PC or tablet', 0);

var editor = new wangEditor('#editor_test');
editor.create();

const create = new Vue({
    el: '#assignment_create',
    data: {
    	num_of_questions: 0,
    },
    mounted: function () {

    },
    methods: {
    	createNewQuestion: function() {

    	}
    },
});