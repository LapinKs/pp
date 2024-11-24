import {getCustomOptions} from 'tiny_custombutton/options';

let usedAnswers = []; // Храним использованные ответы.

/**
 * Генерирует HTML для списка вариантов.
 * @param {Editor} editor TinyMCE editor instance.
 * @returns {string} HTML для списка вариантов.
 */
const generateAnswerList = (editor) => {
    const options = getCustomOptions(editor);
    const availableOptions = options.filter((option) => {
        const {index, unlimited} = option;
        return unlimited || !usedAnswers.includes(index); // Учитываем флаг unlimited.
    });

    if (!availableOptions.length) {
        return '<p>Нет доступных вариантов ответа.</p>';
    }

    return availableOptions
        .map(
            ({index, label}) => `
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
        <span class="dropdown">
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

                    // Вставляем выбранный текст и заменяем содержимое дропдауна.
                    const answerPlaceholder = `<span class="custom-placeholder">[[${selectedOption.label}]]</span>`;
                    dropdown.outerHTML = answerPlaceholder;

                    // Убираем событие для предотвращения дублирования.
                    dropdown.removeEventListener('click', arguments.callee);
                }
            }
        });
    });
};

