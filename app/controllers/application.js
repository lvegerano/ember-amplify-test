import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { createTodo } from '../graphql/mutations';
import { onCreateTodo } from '../graphql/subscriptions';

export default class ApplicationController extends Controller {
  @service amplify;

  @tracked todos = [];
  @tracked todoName = null;
  @tracked todoDescription = null;

  constructor() {
    super(...arguments);
    this.createSubs();
  }

  @action
  async addTodo(evt) {
    evt.preventDefault();
    const todo = { name: this.todoName , description: this.todoDescription }
    const result = await this.amplify.mutate(createTodo, todo);
    this.addTodoResult(result.data.createTodo);

  }

  createSubs() {
    const sub = {
      next: (evt) => {
        // because of this the origin gets a duplicate task
        const todo = evt.value.data.onCreateTodo;
        this.addTodoResult(todo);
      },
    };
    this.amplify.subscribe(onCreateTodo, sub);
  }

  addTodoResult(todo) {
    this.todos = [...this.todos, todo];
  }

  resetForm() {
    this.todoName = null;
    this.todoDescription = null;
  }
}
