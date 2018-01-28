if (window.innerWidth <= 800)
    showMessage('Please use PC or tablet', 0);

let template = [];
$(function ()
{
    let temp = $('.question');
    template['questions'] = temp.clone();
    template['choice'] = $('#multiple_choice_choice').clone().attr('id', '');
    template['pair'] = $('#matching_pair').clone().attr('id', '');
    template['blank'] = $('#fitb_blank').clone().attr('id', '');
    template['questions']['multiple_choice'] = template['questions'][0];
    template['questions']['fill_in_the_blank'] = template['questions'][1];
    template['questions']['matching'] = template['questions'][2];
    template['questions']['short_answer'] = template['questions'][3];
    $(template['questions'][1]).children('#fitb_blank').remove();
    $(template['questions'][0]).find('#multiple_choice_choice').remove();
    temp.remove();
});

function bindRemove()
{
    $('.remove_question').on('click', function (event)
    {
        $(event.target).parents('.question').hide('fast', function ()
        {
            $(this).remove();
        });
    });
    $('.remove_choice').on('click', function (event)
    {
        $(event.target).parents('.row').hide('fast', function ()
        {
            $(this).remove();
        });
    });
    $('.remove_blank').on('click', function (event)
    {
        $(event.target).parent().hide('fast', function ()
        {
            let elem = event.target.nextSibling.blankElement;
            elem.previousSibling.appendData(elem.nextSibling.textContent);
            elem.nextSibling.remove();
            elem.remove();
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
    mounted: function ()
        {
        },
    methods: {
        submit: function ()
            {
                let settings = $('.settings');
                for (let i = 0; i < settings.length; i++)
                {
                    if ($(settings[i]).val().length === 0)
                    {
                        showMessage('settings', 0);
                        return;
                    }
                }
                let questions = $('.question');
                for (let i = 0; i < questions.length; i++)
                {
                    let temp = $(questions[i]);
                    let type = temp.attr('type');
                    switch (type)
                    {
                        case 'multiple_choice':
                            this.correct[i] = [];
                            this.questions[i] = {'answer': {}};
                            this.questions[i].question = temp.find('textarea').val();
                            this.questions[i].type = 0;
                            this.questions[i].option = null;
                            let choices = temp.find('.choice').children();
                            if (choices.length > 52)
                                showMessage('Too much choices in question' + i + 1, 0);
                            for (let j = 0; j < choices.length; j++)
                            {
                                let input = $(choices[j]).find('input');
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
                            this.questions[i].question = {'content': {}};
                            this.questions[i].question.title = temp.find('textarea').val();
                            this.questions[i].type = 2;
                            this.questions[i].option = null;
                            // if (choices.length > 26)
                            //     showMessage('Too much pairs in question' + i + 1, 0);
                            let pairs = temp.find('.pairs').children();
                            for (let j = 0; j < pairs.length; j++)
                            {
                                let input = $(pairs[j]).find('input');
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
                let form = document.getElementById('submit_form');
                form.children[1].value = JSON.stringify(this.questions);
                form.children[2].value = JSON.stringify(this.correct);
                form.children[3].value = "{\"open\":true,\"attempt\":3}";
                form.submit();
            },
        addQuestion: function ()
            {
                let root = $('#all_questions');
                for (let i = 0; i < this.amount; i++)
                {
                    let newNode = $(template['questions'][this.select_question_type]).clone().attr('index', this.index);
                    if (this.select_question_type == 'fill_in_the_blank')
                    {
                        newNode.children().children('.fitb_prompt').on('keydown', function (event)
                        {
                            if (getSelection().anchorNode.parentNode !== event.target && getSelection().anchorNode !== event.target)
                            {
                                showMessage("don't modify blank", 0);
                                event.preventDefault();
                            }
                        });
                        newNode.children().children('.fitb_prompt')[0].blanksCount = 0;
                        newNode.children().children('.fitb_prompt')[0].childNodes.indexOf = indexOf;
                    }
                    if (this.select_question_type == 'multiple_choice')
                    {
                        newNode.attr('count', 4);
                        for (var i = 0; i < 4; i++)
                        {
                            var id = this.index + '_' + i;
                            console.log(id);
                            var temp = template['choice'].clone();
                            temp.find('.custom-control-input').attr('id', id);
                            temp.find('.custom-control-label').attr('for', id);
                            newNode.find('.choice').append(temp);
                        }
                    }
                    root.append(newNode);
                    this.index++;
                }
                bindRemove();
                $('.add_choice').on('click', function (event)
                {
                    let type = $(event.target).parents('.card').attr('type');
                    switch (type)
                    {
                        case 'multiple_choice':
                            var questionIndex = $(event.target).parents('.question').attr('index');
                            var choiceIndex = $(event.target).parents('.question').attr('count');
                            console.log(questionIndex + " " + choiceIndex);
                            var temp = template['choice'].clone();
                            var id = 'MC_' + questionIndex + '-' + choiceIndex
                            temp.find('.custom-control-input').attr('id', id);
                            console.log(temp.find('.custom-control-input').attr('id'));
                            temp.find('.custom-control-label').attr('for', id);
                            $(event.target).prev().append(temp);
                            choiceIndex++;
                            $(event.target).parents('.question').attr('count', choiceIndex);
                            break;
                        case 'fill_in_the_blank':
                            let selection = getSelection();
                            let prompt = event.target.parentNode.previousElementSibling;
                            let anchorNodeIndex = prompt.childNodes.indexOf(selection.anchorNode);
                            let blankID = 'FibT_' + $(event.target).parents('.question').attr('index') + '-' + prompt.blanksCount;
                            if (anchorNodeIndex === -1)
                            {
                                showMessage('Please set ...', 0);
                                break;
                            }
                            else
                            {
                                let newElement = document.createElement('span');
                                newElement.classList.add('blank-text');
                                newElement.onclick = () => {$('#' + blankID).focus();}
                                if (selection.isCollapsed)
                                {
                                    selection.anchorNode.splitText(selection.anchorOffset);
                                    $(selection.anchorNode).after(newElement);
                                }
                                else
                                {
                                    if (selection.anchorOffset > selection.focusOffset)
                                    {
                                        selection.anchorNode.splitText(selection.focusOffset).splitText(selection.anchorOffset);                                        
                                        newElement.textContent = selection.focusNode.nextSibling.textContent;
                                        selection.focusNode.nextSibling.remove();
                                        $(selection.focusNode).after(newElement);
                                    }
                                    else
                                    {
                                        selection.anchorNode.splitText(selection.anchorOffset).splitText(selection.focusOffset);
                                        newElement.textContent = selection.anchorNode.nextSibling.textContent;
                                        selection.anchorNode.nextSibling.remove();
                                        $(selection.anchorNode).after(newElement);
                                    }
                                }
                                let newBlank = template['blank'].clone().attr('hidden', false).on('input', (event) =>
                                {
                                    // sync the input
                                    event.target.blankElement.textContent = (event.target.value.length > 0 ? event.target.value : '_');
                                })
                                newBlank[0].childNodes[1].id = blankID;
                                newBlank[0].childNodes[1].blankElement = newElement;
                                if (newElement.textContent.length === 0)
                                    newElement.textContent = '_';
                                else
                                    newBlank[0].childNodes[1].value = newElement.textContent;
                                $(event.target).parents('.blanks').append(newBlank);
                                prompt.blanksCount++;
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