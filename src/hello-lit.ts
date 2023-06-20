import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './todo-list.js';

const logo = new URL('../../assets/logo.svg#flame', import.meta.url).href;

@customElement('hello-lit')
export class HelloLit extends LitElement {
  @property({ type: String }) header = 'Lit todos';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #006;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--hello-lit-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin infinite 2.5s linear;
    }

    .lit-logo {
      width: 6rem;
      height: 7.5rem;
    }

    @keyframes app-logo-spin {
      0% {
        transform: rotate(-15deg);
      }
      50% {
        transform: rotate(15deg);
      }
      100% {
        transform: rotate(-15deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      background: -webkit-linear-gradient(45deg, #b7b7b7, #777);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 1px 1px 1px #e7e7e7;
      align-items: center;
    }
  `;

  render() {
    return html`
      <main>
        <div class="logo">
          <img class="lit-logo" alt="lit-todo" src=${logo} />
        </div>
        <h1>${this.header}</h1>

        <todo-list></todo-list>
      </main>

      <p class="app-footer">/ Made using open-wc tools in 2023 /</p>
    `;
  }
}
