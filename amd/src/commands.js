import {getButtonImage} from 'editor_tiny/utils';
import {getString} from 'core/str';
import {component, buttonName, icon} from 'tiny_custombutton/common';
import {handleAction} from 'tiny_custombutton/ui';
import {getSelectedElement} from 'tiny_custombutton/utils';
import {isCustomFilterActive} from 'tiny_custombutton/options';

/**
 * Tiny Custom Button commands.
 *
 * @module      tiny_custombutton/commands
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

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
            // Register the Button Icon.
            editor.ui.registry.addIcon(icon, buttonImage.html);

            // Register the Menu Button as a toggle.
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

            // Add the Menu Item.
            editor.ui.registry.addMenuItem(buttonName, {
                icon,
                text: buttonText,
                onAction: () => handleAction(editor),
            });
        }
    };
};
