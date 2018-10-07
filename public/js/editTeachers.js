$(document).ready(function() {
    $('#teacherType').on('change', setQuestionair);
    $('.circle').click(e => { showTab(`${e.target.id}Tab`) });
});
function setQuestionair() {
    $('#form-title').text(`Add ${$('#teacherType option:selected').text()} Teacher`);
    let options = {
        'Miscelaneous': ['Name', 'Group'],
        'PreK': ['Name', 'Class'],
        'Elementary': ['Name', 'Class', 'Room', 'Assistants'],
        'Middle': ['Name', 'Grade'],
        'Assistants': ['Name']
    }
    let key = $('#teacherType').val();
    let html = getFormHTMLWithQueries(options[key]);
    $('#query-table').html(html);
    $('#type-input').val(key);
}
function getFormHTMLWithQueries(queries) {
    let html = '';
    for (let query of queries) {
        html += `<tr><td>${query}: </td><td><input name="${query}" type="text"></td></tr>`
    }
    return html
}
function showTab(tabName) {
    tabs = ['createTeacherButtonTab', 'removeTeacherButtonTab', 'editTeacherButtonTab'];
    tabs.splice(tabs.indexOf(tabName), 1);
    $('#'+tabName).show();
    for (let tab of tabs) {
        $(`#${tab}`).hide();
    }
}