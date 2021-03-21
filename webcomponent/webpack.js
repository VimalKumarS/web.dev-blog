module.exports = {

    entry: { /* config */ },

    output: { /* config */ },

    module: {
        rules: [
            // Regular css files
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },

            // Transforming SCSS file into CSS string
            {
                test: /\.scss$/,
                use: [
                    'raw-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, 'node_modules')]
                        }
                    }
                ]
            },
        ]
    },
    plugins: [],
};

// // Read SCSS file as a raw CSS text
// import styleText from './my-component.scss';

// const sheet = new CSSStyleSheet();
// sheet.replaceSync(styleText);