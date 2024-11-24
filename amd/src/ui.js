import { getCustomOptions } from 'tiny_custombutton/options';

let usedAnswers = []; // Храним использованные ответы.

/**
 * Генерирует HTML для списка вариантов.
 * @param {Editor} editor TinyMCE editor instance.
 * @returns {string} HTML для списка вариантов.
 */
const generateAnswerList = (editor) => {
    const options = getCustomOptions(editor);
    const availableOptions = options.filter((option) => {
        const { index, unlimited } = option;
        return unlimited || !usedAnswers.includes(index); // Учитываем флаг unlimited.
    });

    if (!availableOptions.length) {
        return '<p>Нет доступных вариантов ответа.</p>';
    }

    return availableOptions
        .map(
            ({ index, label }) => `
                <div class="answer-item" data-answer="${index}">
                    ${label}
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
    const optionsHTML = generateAnswerList(editor);

    // Вставляем выпадающий список в редактор.
    const dropdownHTML = `
        <span class="dropdown" data-dropped="true">
            <span class="dropdown-toggle">Выбрать вариант</span>
            <div class="dropdown-content">${optionsHTML}</div>
        </span>
    `;
    editor.insertContent(dropdownHTML);

    // Обработка кликов по выпадающему списку.
    const dropdownElements = document.querySelectorAll('.dropdown');

    dropdownElements.forEach((dropdown) => {
        dropdown.addEventListener('click', (event) => {
            if (event.target.classList.contains('answer-item')) {
                const answerIndex = parseInt(event.target.dataset.answer, 10);
                const selectedOption = getCustomOptions(editor).find(
                    (option) => option.index === answerIndex
                );

                if (selectedOption) {
                    // Помечаем как использованный, если нет флага unlimited.
                    if (!selectedOption.unlimited) {
                        markAnswerAsUsed(answerIndex);
                    }

                    // Скрытно заменяем выпадающий список на плейсхолдер.
                    const answerPlaceholder = `<span class="custom-placeholder" data-answer="${answerIndex}">[[${selectedOption.label}]]</span>`;
                    dropdown.outerHTML = answerPlaceholder;
                }
            }
        });
    });
};

/**
 * Функция для рендеринга данных перед предварительным просмотром.
 * Заменяет дропдаун на плейсхолдеры в контексте превью.
 * @param {Editor} editor TinyMCE editor instance.
 */
export const renderPreview = (editor) => {
    // Находим все дропдауны в контенте и заменяем их на плейсхолдеры.
    const dropdownElements = editor.dom.select('.dropdown');
    dropdownElements.forEach((dropdown) => {
        const answerIndex = dropdown.querySelector('.dropdown-toggle').innerText; // или другим способом получаем индекс
        const answerPlaceholder = `<span class="custom-placeholder" data-answer="${answerIndex}">[[${answerIndex}]]</span>`;
        editor.dom.replace(answerPlaceholder, dropdown);
    });
};

/**
 * Восстановление состояния при редактировании.
 * Заменяет плейсхолдеры обратно на дропдауны при повторном открытии редактора.
 * @param {Editor} editor TinyMCE editor instance.
 */
export const restoreEditorState = (editor) => {
    // Восстановление дропдаунов из плейсхолдеров.
    const placeholders = editor.dom.select('.custom-placeholder');
    placeholders.forEach((placeholder) => {
        const index = placeholder.dataset.answer;
        const dropdownHTML = `
            <span class="dropdown" data-dropped="true">
                <span class="dropdown-toggle">Выбрать вариант</span>
                <div class="dropdown-content">${generateAnswerList(editor)}</div>
            </span>
        `;
        editor.dom.replace(dropdownHTML, placeholder);
    });
};


