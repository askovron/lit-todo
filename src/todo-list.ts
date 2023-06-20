import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import './todo-row.js';

type TodoType = {
  id: string;
  text: string;
  checked?: boolean;
};

const LS_SESSION_KEY = 'saved-lit-todos';

@customElement('todo-list')
class TodoList extends LitElement {
  @property({ type: Boolean })
  private isAddBtnEnabled = false;

  private $newTodo: HTMLInputElement | null | undefined;

  @property({ type: Array })
  _todos: TodoType[] = [];

  get todos(): TodoType[] {
    return this._todos;
  }

  set todos(data: TodoType[]) {
    sessionStorage.setItem(LS_SESSION_KEY, JSON.stringify(data));
    this._todos = data;
  }

  static styles = css`
    .todos {
      padding: 0;
      margin: 0;
      list-style: none;
      text-align: left;
    }

    .new-todo {
      display: flex;
      margin-top: 0.5rem;
      padding: 0.25rem;
      text-align: left;
    }

    .new-todo-text {
      flex: 1;
      margin-right: 0.25rem;
      background: transparent;
      border: 0 currentColor solid;
      border-bottom-width: 1px;
    }

    .new-todo-text:focus {
      outline: none;
      border-bottom-width: 2px;
    }

    .new-todo [type='submit'] {
      padding: 0.25rem 0.75rem;
      background: #bbf;
      border: 1px currentColor solid;
      border-radius: 3px;
      cursor: pointer;
    }

    .new-todo [type='submit'][disabled] {
      background: none;
      opacity: 0.5;
    }

    .remove-completed {
      color: #f55;
      border: 0;
      background: none;
      text-decoration: underline;
      font-size: 0.675rem;
      margin-left: auto;
      cursor: pointer;
    }

    .remove-completed[disabled] {
      display: none;
    }
  `;

  public connectedCallback() {
    super.connectedCallback();

    const storedData = sessionStorage.getItem(LS_SESSION_KEY);
    if (storedData) {
      this.todos = JSON.parse(storedData);
    }
  }

  firstUpdated() {
    this.$newTodo = this.shadowRoot?.querySelector('.new-todo-text');
  }

  updated() {
    const btnRemoveCompleted: HTMLButtonElement | undefined | null =
      this.shadowRoot?.querySelector('.remove-completed');

    if (btnRemoveCompleted) {
      btnRemoveCompleted.disabled = true;
      const completedItems = this.todos.find((todo: TodoType) => todo.checked);

      if (completedItems) {
        btnRemoveCompleted.disabled = false;
      }
    }
  }

  render() {
    return html` <div>
      <ul class="todos">
        ${repeat(
          this.todos,
          (todo: TodoType) => todo.id,
          (todo: TodoType) =>
            html`<todo-row
              id=${todo.id}
              type="checkbox"
              ?checked=${todo.checked}
              @on-change="${this.onToggleTodo}"
              @on-delete="${this.onRemoveTodo}"
              >${todo.text}</todo-row
            >`
        )}
      </ul>
      <form class="new-todo">
        <input type="text" class="new-todo-text" @input=${this.onInput} />
        <button
          type="submit"
          ?disabled=${!this.isAddBtnEnabled}
          @click=${this.onAddTodo}
        >
          Will do
        </button>
      </form>
      ${this.todos.length > 0
        ? html`<button
            class="remove-completed"
            @click=${this.onRemoveCompleted}
          >
            Remove completed
          </button>`
        : html`<p>No todos yet; time to create first!</p>`}
    </div>`;
  }

  private onInput() {
    const todoText = this.$newTodo!.value.trim();
    this.isAddBtnEnabled = todoText.length > 0;
  }

  private onAddTodo(e: SubmitEvent) {
    e.preventDefault();

    if (this.isAddBtnEnabled) {
      this.todos = this.todos.concat({
        text: this.$newTodo!.value,
        checked: false,
        id: Math.random().toString(16).slice(-10),
      });
      this.$newTodo!.value = '';
      this.isAddBtnEnabled = false;
    }
  }

  private onToggleTodo(e: CustomEvent) {
    this.todos = this.todos.map((todo: TodoType) =>
      todo.id === e.detail ? { ...todo, checked: !todo.checked } : todo
    );
  }

  private onRemoveCompleted() {
    this.todos = this.todos.filter((todo: TodoType) => !todo.checked);
  }

  private onRemoveTodo(e: CustomEvent) {
    this.todos = this.todos.filter((todo: TodoType) => todo.id !== e.detail);
  }
}
