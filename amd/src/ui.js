import {getCustomOptions} from 'tiny_custombutton/options';

/**
 * Handles the button action.
 *
 * @param {Editor} editor TinyMCE editor instance
 */
export const handleAction = (editor) => {
    const selectedText = editor.selection.getContent();
    if (!selectedText.trim()) {
        editor.notificationManager.open({
            text: 'Выберите текст вопроса для добавления вариантов ответа.',
            type: 'warning',
        });
        return;
    }

    const options = getCustomOptions(editor);
    const listHTML = options.map((option) => `<li>${option}</li>`).join('');

    editor.insertContent(`
        <div class="question-block">
            <p><strong>Вопрос:</strong> ${selectedText}</p>
            <ul class="answer-options">
                ${listHTML}
            </ul>
        </div>
    `);
};
