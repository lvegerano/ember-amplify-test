import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { listTodos } from '../graphql/queries'

export default class ApplicationRoute extends Route {
  @service amplify;

  async model() {
    const results = await this.amplify.query(listTodos);
    return results.data.listTodos.items;
  }

  setupController(controller, model) {
    controller.todos = model || [];
  }
}
