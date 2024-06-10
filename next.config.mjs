// next.config.js
export function webpack(config) {
    // Exclude HTML files from being parsed as modules
    config.module.rules.push({
        test: /\.html$/,
        loader: 'ignore-loader',
    });
    return config;
}
  