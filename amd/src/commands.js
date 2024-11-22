import {getButtonImage} from 'editor_tiny/utils';
import {getString} from 'core/str';
import {component, buttonName, icon} from 'tiny_custombutton/common';
import {handleAction} from 'tiny_custombutton/ui';
import {getSelectedElement} from 'tiny_custombutton/utils';
import {isCustomFilterActive} from 'tiny_custombutton/options';


export const getSetup = async() => {
    const [
        buttonText,
        buttonImage,
    ] = await Promise.all([
        getString('buttontitle', component),
        getButtonImage('icon', component),
    ]);

    return (editor) => {
        if (isCustomFilterActive(editor)) {
            editor.ui.registry.addIcon(icon, buttonImage.html);
            editor.ui.registry.addToggleButton(buttonName, {
                icon,
                tooltip: buttonText,
                onAction: () => {
                    handleAction(editor);
                },
                onSetup: (api) => {
                    editor.on('NodeChange', () => {
                        const result = getSelectedElement(editor);
                        api.setActive(result);
                    });
                },
            });
            editor.ui.registry.addMenuItem(buttonName, {
                icon,
                text: buttonText,
                onAction: () => handleAction(editor),
            });
        }
    };
};
