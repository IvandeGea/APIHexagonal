export default class Task {
  _id: string | undefined;
  title: string;
  completed: boolean;

  constructor(title: string) {
    this.title = title;
    this.completed = false;
  }
}
