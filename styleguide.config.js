const path = require('path');

module.exports = {
  title: 'Uast Viewer',
  require: [path.resolve(__dirname, 'styles/default-theme.scss')],
  context: {
    uast: path.resolve(__dirname, 'docs/example_uast.json'),
    sourceCode: path.resolve(__dirname, 'docs/example_java_source.js')
  },
  sections: [
    {
      name: 'Quick start',
      content: 'docs/quick_start.md'
    },
    {
      name: 'Use cases',
      sections: [
        {
          name: 'Uncontrolled',
          content: 'docs/cases/uncontrolled.md'
        },
        {
          name: 'Controlled',
          content: 'docs/cases/controlled.md'
        },
        {
          name: 'With source code',
          content: 'docs/cases/with_source_code.md'
        }
      ]
    },
    {
      name: 'UI Components',
      components: 'src/components/**/*.js'
    },
    {
      name: 'State',
      content: 'docs/state.md',
      sections: [
        {
          name: 'Helpers',
          content: 'docs/state/helpers.md'
        },
        {
          name: 'Position index',
          content: 'docs/state/position_index.md'
        },
        {
          name: 'UAST v1',
          content: 'docs/state/uast-v1.md'
        }
      ]
    }
  ],
  getExampleFilename(componentPath) {
    return path.resolve(
      __dirname,
      `${componentPath.replace('src/', 'docs/').replace(/\.js$/, '.md')}`
    );
  },
  pagePerSection: true,
  ribbon: {
    url: 'https://github.com/src-d/uast-viewer',
    text: 'Fork me on GitHub'
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }
      ]
    },
    resolve: {
      alias: {
        'uast-viewer': path.resolve(__dirname, 'src/index.js')
      }
    }
  }
};
