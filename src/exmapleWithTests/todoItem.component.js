import template from './todoItem.html'



export class TodoItemController {
  constructor(todoList) {
    "ngInject";
    this.todoList = todoList;
    this.isEditing = false;
  }

  onDestroyClick() {
    this.todoList.remove(this.task);
  }

  onSave(description) {
    if (!description) {
      this.todoList.remove(this.task);
    } else {
      this.task.description = description;
    }

    this.isEditing = false;
  }

  toggleStatus() {
    this.todoList.toggleStatus(this.task);
  }

  /**
   * This hack is needed due angular doesn't have one-way bindings (atleast for now)
   * It allows not to override model value from inside this component.
   *
   * @returns {boolean}
   */
  get complete() {
    return this.task.complete;
  }

  /**
   * @param {boolean} val
   */
  set complete(val) {
    // do nothing
  }
}

export default {
  bindings: {
    task: '=todo'
  },
  template,
  controller: TodoItemController,
  controllerAs: 'vm'
}
