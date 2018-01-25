if (window.innerWidth <= 800)
    showMessage('Please use PC or tablet', 0);

var template = [];
$(function () {
    var temp = $('.question');
    template['questions'] = temp.clone();
    template['choice'] = $('#multiple_choice_choice').clone();
    template['pair'] = $('#matching_pair').clone();
    template['blank'] = $('#fitb_blank').clone();
    template['questions']['multiple_choice'] = template['questions'][0];
    template['questions']['fill_in_the_blank'] = template['questions'][1];
    template['questions']['matching'] = template['questions'][2];
    template['questions']['short_answer'] = template['questions'][3];
    $(template['questions'][1]).children('#fitb_blank').remove();
    temp.remove();
});

function bindRemove() {
    $('.remove_question').on('click', function (event) {
        $(event.target).parents('.question').hide('fast', function () {
            $(this).remove();
        });
    });
    $('.remove_choice').on('click', function (event) {
        $(event.target).parents('.row').hide('fast', function () {
            $(this).remove();
        });
    });
    $('.remove_blank').on('click', function (event) {
        $(event.target).parent().hide('fast', function () {
            $(this).remove();
        });
    });
}

const create = new Vue({
    el: '#create',
    data: {
        select_question_type: 'multiple_choice',
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        questions: {},
        correct: [],
        index: 0,
        amount: 1,
    },
    mounted: function () {
    },
    methods: {
        submit: function () {
            var settings = $('.settings');
            for (var i = 0; i < settings.length; i++) {
                if ($(settings[i]).val().length === 0) {
                    showMessage('settings', 0);
                    return;
                }
            }
            var questions = $('.question');
            for (var i = 0; i < questions.length; i++) {
                var temp = $(questions[i]);
                var type = temp.attr('type');
                switch (type) {
                    case 'multiple_choice':
                        this.correct[i] = [];
                        this.questions[i] = {'answer': {}};
                        this.questions[i].question = temp.find('textarea').val();
                        this.questions[i].type = 0;
                        this.questions[i].option = null;
                        var choices = temp.find('.choice').children();
                        if (choices.length > 52)
                            showMessage('Too much choices in question' + i + 1, 0);
                        for (var j = 0; j < choices.length; j++) {
                            var input = $(choices[j]).find('input');
                            this.questions[i].answer[this.alphabet[j]] = input[0].value;
                            if (input[1].checked)
                                this.correct[i].push(this.alphabet[j]);
                        }
                        break; //Case 0: MCQ

                    case 'fill_in_the_blank':
                        this.questions[i] = {};
                        this.questions[i].question = temp.find('textarea').val();
                        this.correct[i] = temp.find('input').val();
                        this.questions[i].type = 1;
                        this.questions[i].option = null;
                        break; //Case 1: Fill-in-the-blank Questions

                    case 'matching':
                        this.correct[i] = null;
                        this.questions[i] = {'answer': {}};
                        this.questions[i].question = {'content':{}};
                        this.questions[i].question.title = temp.find('textarea').val();
                        this.questions[i].type = 2;
                        this.questions[i].option = null;
                        // if (choices.length > 26)
                        //     showMessage('Too much pairs in question' + i + 1, 0);
                        var pairs = temp.find('.pairs').children();
                        for (var j = 0; j < pairs.length; j++) {
                            var input = $(pairs[j]).find('input');
                            this.questions[i].question.content[j] = input[0].value;
                            this.questions[i].answer[j] = input[1].value;
                            // this.correct[i].push(this.alphabet[j])
                        }
                        break; //Case 2: Matching Questions

                    case 'short_answer':
                        this.questions[i] = {};
                        this.correct[i] = null;
                        this.questions[i].question = temp.find('textarea').val();
                        this.questions[i].type = 3;
                        this.questions[i].option = null;
                        break; //Case 3: Short Answer Question
                }
            }
            var form = document.getElementById('submit_form');
            form.children[1].value = JSON.stringify(this.questions);
            form.children[2].value = JSON.stringify(this.correct);
            form.children[3].value = "{\"open\":true,\"attempt\":3}";
            form.submit();
        },
        addQuestion: function () {
            var root = $('#all_questions');
            for (var i = 0; i < this.amount; i++) {
                var newNode = $(template['questions'][this.select_question_type]).clone().attr('index', this.index);
                if (this.select_question_type == 'fill_in_the_blank')
                    newNode.children().children('.fitb_prompt').on('keydown', (event) => {
                        switch (event.originalEvent.key)
                        {
                            case 'BackSpace':
                            case 'Enter':
                                break;
                        }
                    });
                root.append(newNode);
                this.index++;
            }
            bindRemove();
            $('.add_choice').on('click', function (event) {
                var type = $(event.target).parents('.card').attr('type');
                switch (type) {
                    case 'multiple_choice':
                        $(event.target).prev().append(template['choice'].clone());
                        break;
                    case 'fill_in_the_blank':
                        var selection = getSelection();
                        var anchorNodeIndex = event.target.childNodes.indexOf(selection.anchorNode);
                        if (anchorNodeIndex === -1)
                        {
                            showMessage('Please set ...', 0);
                            break;
                        }
                        else
                        {
                            if (selection.isCollapsed)
                            {
                                event.target.childNodes[anchorNodeIndex];
                            }
                            else
                            {

                            }
                            $(event.target).parents('.blanks').append(template['blank'].clone().attr('hidden', false).on('input', () => {
                                // sync the input
                                
                            }));
                            break;
                        }
                    case 'matching':
                        $(event.target).siblings('.form-group-vertical').append(template['pair'].clone());
                        break;
                }
                bindRemove();
            });         
        },
    },
});