import { jsonPlaceholder } from "../utils/base-axios.js";

export default class TodoModule {
    //* create a Todo
    static async createTodo(args) {
        try {
            const newTodo = await jsonPlaceholder.post(
                "/todos",
                {
                    userId: args.userId,
                    title: args.title,
                    completed: false,
                },
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return newTodo.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* update an existing Todo
    static async updateTodo(args) {
        try {
            const todo = await this.fetchTodo(args.todoId);

            if (args.title) todo.title = args.title;
            if (args.completed) todo.completed = args.completed;

            const updatedTodo = await jsonPlaceholder.put(
                `/todos/${args.todoId}`,
                todo,
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return updatedTodo.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* delete an existing Todo
    static async deleteTodo(args) {
        //! doesn't make sense to call this
        // await jsonPlaceholder.delete(`/todos/${args.todoId}`);
        return await this.fetchTodo(args.todoId);
    }

    //* fetch Todos
    static async fetchTodos() {
        try {
            const todos = await jsonPlaceholder.get(`/todos`);
            return todos.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch a Todo
    static async fetchTodo(todoId) {
        try {
            const todo = await jsonPlaceholder.get(`/todos/${todoId}`);
            return todo.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
}
