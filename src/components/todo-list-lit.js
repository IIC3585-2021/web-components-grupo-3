import '@material/mwc-formfield';
import '@material/mwc-button';
import '@material/mwc-textfield';


import { LitElement, html } from 'lit-element'; 

class TodoListLit extends LitElement { 
  static get properties() { 
    return {
      item1: { type: String },
      item2: { type: String },
      item3: { type: String },
      todos: { type: Array },
      promt: { type: String },
      title: { type: String },
      task: { type: String }
    };
  }

  constructor() { 
    super();
    this.todos = [];
    this.task = '';
    this.item1 = '';
    this.item2 = '';
    this.item3 = '';
    this.title = 'Todo List';
    this.promt = 'Add Task';
  }

  connectedCallback() {
    super.connectedCallback()
    this.todos = this.item1 != '' ? [...this.todos, { task: this.item1, completed: false}] : this.todos;
    this.todos = this.item2 != '' ? [...this.todos, { task: this.item2, completed: false}] : this.todos;
    this.todos = this.item3 != '' ? [...this.todos, { task: this.item3, completed: false}] : this.todos;

    this.uncompleted = this.todos.filter(todo => todo.completed == false);
    }

  addTodo() {
    console.log(this.task)
    if (this.task) {
      this.todos = [...this.todos, { 
          task: this.task,
          completed: false
      }];
      this.task = ''; 
    }
    this.uncompleted = this.todos.filter(todo => todo.completed == false);
  }

  shortcutListener(e) {
    if (e.key === 'Enter') { 
      this.addTodo();
    }
  }

  updateTask(e) {
    this.task = e.target.value; 
  }

  updateTodoStatus(updatedTodo, completed) {
    this.todos = this.todos.map(todo =>
      updatedTodo === todo ? { ...updatedTodo, completed } : todo
    );
    this.uncompleted = this.todos.filter(todo => todo.completed == false);
    }

  render() {
    return html`
    <link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">
    <div class= "todo-card">
      <h3 class="list-title">${this.title}</h3>
        <div class="todos-list">
          ${this.uncompleted.map(
            todo => html` 
            <div class="list-item">
              <p class="label"> ${todo.task}</p>
              <mwc-button @click="${ e => this.updateTodoStatus(todo, e.target.checked)}">Done</mwc-button>
            </div>
            `
          )}
        </div>
        <div class="input-layout"
          @keyup="${this.shortcutListener}"> 
          <mwc-textfield outlined label="${this.promt}" @change="${this.updateTask}" value="${this.task}" ></mwc-textfield>
          </div>
      </div>
    </div>
    
    <style>
      .todo-card{
        width: 300px;
        max-height: 90%px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        margin: 20px;
      }
      .list-title{
        color: white;
        font-size: 1.4rem;
        display: block;
        text-align: center;
        font-weight: 400;
        margin: 0;
        padding: 15px;
        border-bottom: 1px grey solid;
        background: teal;
        text-transform: uppercase;
      }
      .todos-list{
        display: flex;
        flex-direction: column;
        max-height: 300px;
        overflow-y: auto;
      }
      .list-item{
        box-shadow: 0 0px 1px rgba(0, 0, 0, 0.25);
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        padding: 5px 6px 6px 20px ;
      }
      p{
        margin: 0;
        font-size: 16px;
      }
      mwc-button {
        --mdc-theme-primary: teal;
        margin: 0;
      }
      mwc-textfield{
        padding: 5px;
        width: 290px;
        --mdc-theme-primary: black;
      }

    </style>
    `;
  }
}

customElements.define('todo-list-lit', TodoListLit);
