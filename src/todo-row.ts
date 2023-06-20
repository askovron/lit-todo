import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('todo-row')
class TodoRow extends LitElement {
  @property({ type: String, reflect: true }) id = '0';

  @property({ type: Boolean, reflect: true }) checked = false;

  static styles = css`
    :host {
      font-size: calc(1px + 2vmin);
    }

    li {
      display: flex;
      width: 100%;
      padding: 0.25rem;
    }

    li:hover {
      background: rgba(0, 0, 0, 0.02);
    }

    .remove {
      visibility: hidden;
      margin-left: auto;
      border: 0;
      cursor: pointer;
      color: #f55;
    }

    li:hover .remove {
      visibility: visible;
    }

    label {
      flex: 1;
    }

    label:has(input[checked]) {
      text-decoration: line-through;
    }
  `;

  render() {
    return html`<li title=${this.id}>
      <label
        ><input
          type="checkbox"
          id=${this.id}
          ?checked=${this.checked}
          @change=${this.fireEvent('on-change')} /><slot></slot></label
      ><button
        class="remove"
        type="button"
        @click=${this.fireEvent('on-delete')}
      >
        x
      </button>
    </li>`;
  }

  private fireEvent(eventName: string) {
    return () =>
      this.dispatchEvent(new CustomEvent(eventName, { detail: this.id }));
  }
}
