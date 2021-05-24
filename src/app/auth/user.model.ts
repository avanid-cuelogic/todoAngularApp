import { TaskTodo } from "../todo/todo.model";

export class User {
    constructor(
        public email: string,
        public fname: string,
        public lname: string,
        public password: string,
        public gender: string,
        public address: string,
        public profileImage: string,
        public todoList: TaskTodo[]
    ) {}
}
