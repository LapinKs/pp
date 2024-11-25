import {getButtonImage} from 'editor_tiny/utils';
import {getString} from 'core/str';
import {component, buttonName, icon} from 'tiny_custombutton/common';
import {handleAction} from 'tiny_custombutton/ui';
import {isTextInsertionContext} from 'tiny_custombutton/configuration'



export const getSetup = async () => {
    const contextValid = await isTextInsertionContext();
    if (!contextValid) {
        return () => {}; // Если не тот контекст, возвращаем пустую функцию.
    }

    const [buttonText, buttonImage] = await Promise.all([
        getString('buttontitle', component), // Локализованный текст подсказки.
        getButtonImage('icon', component),  // Иконка для кнопки.
    ]);

    return (editor) => {
        // Регистрируем иконку.
        editor.ui.registry.addIcon(icon, buttonImage.html);

        // Регистрируем кнопку в панели инструментов (с состоянием).
        editor.ui.registry.addToggleButton(buttonName, {
            icon, // Иконка кнопки.
            tooltip: buttonText, // Текст подсказки.
            onAction: () => {
                handleAction(editor); // Действие при нажатии.
            },
            onSetup: (api) => {
                // Настройка отображения состояния кнопки.
                editor.on('NodeChange', () => {
                    const isActive = editor.selection.getNode().classList.contains('dropdown');
                    api.setActive(isActive);
                });
            },
        });

        // Регистрируем кнопку в меню.
        editor.ui.registry.addMenuItem(buttonName, {
            icon, // Иконка для меню.
            text: buttonText, // Текст меню.
            onAction: () => handleAction(editor), // Действие при выборе.
        });
    };
};