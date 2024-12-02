import {getButtonImage} from 'editor_tiny/utils';
import {getString} from 'core/str';
import {component, buttonName, icon} from 'tiny_custombutton/common';
import {handleAction} from 'tiny_custombutton/ui';
// import {isTextInsertionContext} from 'tiny_custombutton/configuration'



export const getSetup = async () => {
    // const contextValid = await isTextInsertionContext();
    // if (!contextValid) {
    //     return () => {}; // Если не тот контекст, возвращаем пустую функцию.
    // }

    const [buttonText, buttonImage] = await Promise.all([
        getString('buttontitle', component), 
        getButtonImage('icon', component),  
    ]);

    return (editor) => {
        editor.ui.registry.addIcon(icon, buttonImage.html);


        editor.ui.registry.addToggleButton(buttonName, {
            icon, 
            tooltip: buttonText, 
            onAction: () => {
                handleAction(editor); 
            },
            onSetup: (api) => {
            
                editor.on('NodeChange', () => {
                    const isActive = editor.selection.getNode().classList.contains('dropdown');
                    api.setActive(isActive);
                });
            },
        });

        editor.ui.registry.addMenuItem(buttonName, {
            icon, 
            text: buttonText, 
            onAction: () => handleAction(editor), 
        });
    };
};