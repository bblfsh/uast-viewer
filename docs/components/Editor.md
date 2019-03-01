Wrapper of [codemirror](https://codemirror.net/) component.

Supports code highlighting of a range of text by passing `markRange` prop.

```js
const sourceCode = `
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  mountNode
);
`;

<Editor
    code={sourceCode}
    languageMode="javascript"
    markRange={{
        from: {line: 2, ch: 2},
        to: {line: 2, ch: 8},
    }}
/>
```
