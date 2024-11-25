import {component as buttonName} from 'tiny_custombutton/common';
import {addMenubarItem, addToolbarButton, addToolbarSection} from 'editor_tiny/utils';

/**
 * Проверяет, является ли текущий контекст "вставкой в текст".
 * @returns {boolean} Возвращает true, если это нужный контекст.
 */
const isTextInsertionContext = async () => {
    try {
        const response = await fetch('/tiny/plugins/custombutton/ajax.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'check_context' })
        });
        const data = await response.json();
        return data.isTextInsertionContext;
    } catch (error) {
        console.error('Error checking context:', error);
        return false;
    }
};

/**
 * Настройка кнопки в панели инструментов.
 * @param {Object} toolbar Текущая конфигурация панели инструментов.
 */
const configureToolbar = (toolbar) => {

    // Добавляем секцию "customsection" в панель инструментов.
    addToolbarSection(toolbar, 'customsection', 'formatting', true);

    // Добавляем кнопку в указанную секцию "customsection".
    return addToolbarButton(toolbar, 'customsection', buttonName);
};

/**
 * Конфигурация плагина TinyMCE.
 * @param {Object} instanceConfig Конфигурация текущего экземпляра редактора.
 * @returns {Object} Конфигурация меню и панели инструментов.
 */
export const configure = (instanceConfig) => {
    if (!isTextInsertionContext()) {
        return instanceConfig; // Если не тот контекст, возвращаем конфигурацию без изменений.
    }

    return {
        // Добавляем кнопку в меню "Insert".
        menu: addMenubarItem(instanceConfig.menu, 'insert', buttonName),

        // Настраиваем панель инструментов, добавляя кнопку в секцию "customsection".
        toolbar: configureToolbar(instanceConfig.toolbar),
    };
};
