import Service from '@ember/service';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import awsconfig from '../aws-exports';

export default class AmplifyService extends Service {
  api = API;

  constructor() {
    super(...arguments);
    API.configure(awsconfig);
    PubSub.configure(awsconfig);
  }

  mutate(op, data) {
    return this.api.graphql(graphqlOperation(op, { input: data }))
  }

  query(op) {
    return this.api.graphql(graphqlOperation(op));
  }

  subscribe(op, sub) {
    return this.api.graphql(graphqlOperation(op)).subscribe(sub);
  }
}
