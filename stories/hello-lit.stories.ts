import { html, TemplateResult } from 'lit';
import '../src/hello-lit.js';

export default {
  title: 'HelloLit',
  component: 'hello-lit',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ header, backgroundColor = 'white' }: ArgTypes) => html`
  <hello-lit style="--hello-lit-background-color: ${backgroundColor}" .header=${header}></hello-lit>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
