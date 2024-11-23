import {getCustomOptions} from 'tiny_custombutton/options';

let usedAnswers = []; // Храним использованные ответы.

/**
 * Генерирует HTML для списка вариантов.
 * @param {Editor} editor TinyMCE editor instance.
 * @returns {string} HTML для списка вариантов.
 */
const generateAnswerList = (editor) => {
    const options = getCustomOptions(editor);
    const availableOptions = options.filter((_, index) => !usedAnswers.includes(index));

    if (!availableOptions.length) {
        return '<p>Нет доступных вариантов ответа.</p>';
    }

    return availableOptions
        .map(
            (option, index) => `
                <div class="answer-item" data-answer="${index}">
                    ${option}
                </div>`
        )
        .join('');
};

/**
 * Помечает вариант ответа как использованный.
 * @param {number} answerIndex Индекс варианта ответа.
 */
const markAnswerAsUsed = (answerIndex) => {
    if (!usedAnswers.includes(answerIndex)) {
        usedAnswers.push(answerIndex);
    }
};

/**
 * Обрабатывает вставку текста и управление вариантами.
 * @param {Editor} editor TinyMCE editor instance.
 */
export const handleAction = (editor) => {
    const selectedText = editor.selection.getContent();
    const optionsHTML = generateAnswerList(editor);

    editor.insertContent(`
        <span class="dropdown">
            <span class="dropdown-toggle">Выбрать вариант</span>
            <div class="dropdown-content">${optionsHTML}</div>
        </span>
    `);

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('answer-item')) {
            const answerIndex = event.target.dataset.answer;
            markAnswerAsUsed(answerIndex);

            const answerPlaceholder = `[[${answerIndex}]]`;
            editor.insertContent(answerPlaceholder);
        }
    });
};
