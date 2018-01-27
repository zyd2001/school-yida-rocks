if (window.innerWidth <= 800)
    showMessage('Please use PC or tablet', 0);

let template = [];
$(function ()
{
    let temp = $('.question');
    template['questions'] = temp.clone();
    template['choice'] = $('#multiple_choice_choice').clone();
    template['pair'] = $('#matching_pair').clone();
    template['blank'] = $('#fitb_blank').clone();
    template['questions']['multiple_choice'] = template['questions'][0];
    template['questions']['fill_in_the_blank'] = template['questions'][1];
    template['questions']['matching'] = template['questions'][2];
    template['questions']['short_answer'] = template['questions'][3];
    $(template['questions'][1]).children('#fitb_blank').remove();
    $(template['questions'][0]).find('#multiple_choice_choice').remove();
    temp.remove();
});

function rerender()
{
    this.innerHTML = '';
    let blanksIndex = 0;
    for (let str of this.slices)
    {
        if (str[str.length - 1] == '\n')
            this.innerHTML += str.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
        else
        {
            this.innerHTML += str;
            if (blanksIndex < this.blanks.length)
            {
                this.innerHTML += '&nbsp;<span style="color:blue;text-decoration:underline">' + (this.blanks[blanksIndex].length > 0 ? this.blanks[blanksIndex] : '_') + '</span>&nbsp;';
                blanksIndex++;
            }
        }
    }
}

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
                        newNode.children().children('.fitb_prompt').on('input', function (event)
                        {
                            if (event.target.slices && getSelection().anchorNode.parentNode === event.target)
                            {
                                if (event.target.slices[event.target.childNodes.indexOf(getSelection().anchorNode)][event.target.slices[event.target.childNodes.indexOf(getSelection().anchorNode)].length - 1] == '\n')
                                    event.target.slices[event.target.childNodes.indexOf(getSelection().anchorNode)] = getSelection().anchorNode.wholeText + '\n';
                                else
                                    event.target.slices[event.target.childNodes.indexOf(getSelection().anchorNode)] = getSelection().anchorNode.wholeText;
                            }
                        });
                        newNode.children().children('.fitb_prompt')[0].rerender = rerender;
                        newNode.children().children('.fitb_prompt')[0].blanksCount = 0;
                        newNode.children().children('.fitb_prompt')[0].childNodes.indexOf = function (node)
                            {
                                let index = 0;
                                for (let i = 0; i < this.length; i++)
                                {
                                    if (this[i].nodeName != '#text')
                                        continue;
                                    else if (this[i] === node)
                                        return index;
                                    else
                                        index++;
                                }
                                return -1;
                            };
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
                            var id = questionIndex + '_' + choiceIndex
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
                            if (anchorNodeIndex === -1)
                            {
                                showMessage('Please set ...', 0);
                                break;
                            }
                            else
                            {
                                if (selection.isCollapsed)
                                {
                                    if (!prompt.blanks)
                                    {
                                        prompt.slices = prompt.innerText.split('\n');
                                        for (i in prompt.slices)
                                            prompt.slices[i] += '\n'
                                        prompt.slices.splice(anchorNodeIndex + 1, 0, prompt.slices[anchorNodeIndex].slice(selection.anchorOffset));
                                        prompt.slices[anchorNodeIndex] = prompt.slices[anchorNodeIndex].slice(0, selection.anchorOffset);
                                        prompt.blanks = [];
                                        prompt.blanks[prompt.blanksCount] = '_';
                                        prompt.rerender();
                                    }
                                    else
                                    {
                                        prompt.slices.splice(anchorNodeIndex + 1, 0, prompt.slices[anchorNodeIndex].slice(selection.anchorOffset));
                                        prompt.slices[anchorNodeIndex] = prompt.slices[anchorNodeIndex].slice(0, selection.anchorOffset);
                                        prompt.blanks[prompt.blanksCount] = '_';
                                        prompt.rerender();
                                    }
                                }
                                else
                                {

                                }
                                let newBlank = template['blank'].clone().attr('hidden', false).on('input', (event) =>
                                {
                                    // sync the input
                                    prompt.blanks[event.target.thisBlankIndex] = $(event.target).val();
                                    prompt.rerender();
                                })
                                newBlank[0].childNodes[1].thisBlankIndex = prompt.blanksCount;
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