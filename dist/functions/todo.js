async function handleAddTask(client, message, task) {
    const data = (await client.database.prepare('SELECT * FROM todos WHERE user_id = ?').get('key'));
    if (!data) {
        client.database.prepare('INSERT INTO todos (user_id, tasks) VALUES (?, ?)').run('key', JSON.stringify([]));
        return message.reply({
            content: `Database was not set up. Please try adding the task again.`
        });
    }
    else {
        const tasks = JSON.parse(data.tasks || '[]');
        if (!task) {
            return message.reply({
                content: `Please specify a task to add.`
            });
        }
        else if (task.length > 100) {
            return message.reply({
                content: `Task description should not exceed 100 characters.`
            });
        }
        else {
            tasks.push(task);
            client.database.prepare('UPDATE todos SET tasks = ? WHERE user_id = ?').run(JSON.stringify(tasks), 'key');
            return message.reply({
                content: `Added task: "${task}".`
            });
        }
    }
}
async function handleRemoveTask(client, message, index) {
    const data = (await client.database.prepare('SELECT tasks FROM todos WHERE user_id = ?').get('key'));
    const tasks = JSON.parse(data.tasks || '[]');
    if (!index || isNaN(index) || index < 1 || index > tasks.length) {
        return message.reply({
            content: `Invalid task number. Please provide a valid number from your to-do list.`
        });
    }
    const removedTask = tasks.splice(index - 1, 1);
    client.database.prepare('UPDATE todos SET tasks = ? WHERE user_id = ?').run(JSON.stringify(tasks), 'key');
    return message.reply({
        content: `Removed task: "${removedTask}".`
    });
}
async function handleViewTasks(client, message) {
    const data = (await client.database.prepare('SELECT tasks FROM todos WHERE user_id = ?').get('key'));
    const tasks = JSON.parse(data.tasks || '[]');
    if (tasks.length === 0) {
        return message.reply('Your to-do list is empty!');
    }
    const taskList = tasks.map((task, i) => `\`[${i + 1}]\` - ${task}`).join('\n');
    return message.reply({
        content: `**Your To-Do List**:\n${taskList}`
    });
}
async function handleResetTasks(client, message) {
    client.database.prepare('UPDATE todos SET tasks = ? WHERE user_id = ?').run(JSON.stringify([]), 'key');
    return message.reply('Your to-do list has been reset.');
}
export { handleAddTask, handleRemoveTask, handleResetTasks, handleViewTasks };
