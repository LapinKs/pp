import {getCustomOptions} from 'tiny_custombutton/options';

/**
 * Handles the button action.
 *
 * @param {Editor} editor TinyMCE editor instance
 */
export const handleAction = (editor, answerTracker) => {
    const answers = answerTracker.getAnswers();
    if (!answers.length) {
        editor.notificationManager.open({
            text: 'Варианты ответа отсутствуют. Добавьте их с помощью [[номер вопроса]].',
            type: 'warning',
        });
        return;
    }

    const listHTML = answers.map((answer) => `<li>${answer}</li>`).join('');
    const dropdownHTML = `
        <div class="answer-dropdown">
            <button>Выберите ответ</button>
            <ul class="dropdown-content">
                ${listHTML}
            </ul>
        </div>
    `;

    editor.insertContent(dropdownHTML);
};

export const trackAnswers = (editor) => {
    const answers = [];
    const updateAnswerList = () => {
        const content = editor.getContent();
        const matches = content.match(/\[\[(.*?)\]\]/g);
        if (matches) {
            answers.length = 0; // Очистить предыдущий список.
            matches.forEach((match) => {
                const answer = match.replace(/\[\[|\]\]/g, '');
                if (!answers.includes(answer)) {
                    answers.push(answer);
                }
            });
        }
    };

    editor.on('input', updateAnswerList); // Обновляем список при изменении контента.

    return {
        getAnswers: () => answers,
    };
};