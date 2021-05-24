export class TaskTodo{
    constructor(
      public taskId:string,
        public taskName: string,
        public category: string,
        public isPublic: boolean,
        public status: string,
        public date: string,
        public needReminder: boolean,
        public reminderDate: string,
       public taskImage: string,
       public taskCreatedBy: string,
    ){}
}
