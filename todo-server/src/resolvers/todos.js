export default class TodoResolver {

  constructor(todoRepo) {
    this.todoRepo = todoRepo;
  }

  query = (args) => this.todoRepo.find()
  
  create = ({ title, isCompleted }) => this.todoRepo.insert({ title, isCompleted })
  
  update = ({ id, title, isCompleted }) => this.todoRepo.update({ id, title, isCompleted })

  delete = ({ id }) => this.todoRepo.delete(id)
}