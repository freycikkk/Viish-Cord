import { handleAddTask, handleRemoveTask, handleViewTasks, handleResetTasks } from '../../functions/todo.js';
export default {
    name: 'todo',
    run: async (client, message, args) => {
        const task = args.slice(1).join(' ');
        switch (args[0]) {
            case 'add':
            case '+':
                await handleAddTask(client, message, task);
                break;
            case 'remove':
            case '-':
                await handleRemoveTask(client, message, parseInt(args[1], 10));
                break;
            case 'config':
            case 'show':
            case 'list':
            case 'view':
                await handleViewTasks(client, message);
                break;
            case 'reset':
                await handleResetTasks(client, message);
                break;
            default:
                break;
        }
    }
};
