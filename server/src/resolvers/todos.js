export default class TodoResolver {

  constructor(todoRepo) {
    this.todoRepo = todoRepo;
  }

  query = (args) => this.todoRepo.find()
  
  create = ({ title, isCompleted }) => this.todoRepo.insert({ title, isCompleted })
  
  update = ({ title, isCompleted }) => this.todoRepo.update({ title, isCompleted })
}