const path = require('path');

module.exports = {
  title: 'Uast Viewer',
  require: [path.resolve(__dirname, 'dist/default-theme.css')],
  context: {
    uast: path.resolve(__dirname, 'docs/example_uast.json')
  },
  sections: [
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
        }
      ]
    },
    {
      name: 'UI Components',
      components: 'src/components/**/*.js'
    }
  ],
  getExampleFilename(componentPath) {
    return path.resolve(
      __dirname,
      `${componentPath.replace('src/', 'docs/').replace(/\.js$/, '.md')}`
    );
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
