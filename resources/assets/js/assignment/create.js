if (window.innerWidth <= 800)
    showMessage('Please use PC or tablet', 0);


const create = new Vue({
    el: '#assignment_create',
    data: {
    	num_of_questions: 0,
    	question_type: null,
    },
    mounted: function () {

    },
    methods: {
    	createNewQuestion: function() {
    		console.log(this.num_of_questions);
    	}
    },
});