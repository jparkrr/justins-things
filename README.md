# Justin's Things

Based on Google/web-starter-kit

* Mobile-optimized HTML boilerplate
* Responsive multi-device layout
* Visual component style guide
* [gulp.js](http://gulpjs.com) build tooling *(optional)*
  * LiveReload
  * Cross-device synchronization of clicks, scrolls, navigation, and form-filling (thanks to [BrowserSync](http://browsersync.io/))
  * Image optimization
  * JavaScript minification and optimization
  * CSS minification and optimization
  * HTML minification
  * PageSpeed Insights performance reporting
  * CSS auto-prefixing

## Tooling

### Gulp

Bring up a terminal and type `gulp --version`. If Gulp is installed it should return a version number at or above 3.5.x. If you don't see any errors, proceed to the Gulp commands section. If you need to install Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

This will install Gulp globally. Depending on your user account, you may need to gain elevated permissions using `sudo` (i.e `sudo npm install --global gulp`). Next, install the local dependencies Web Starter Kit requires:

```sh
$ npm install
```

That's it! You should now have everything needed to use the Gulp tools in Web Starter Kit.

### Gulp Commands

You can now use Gulp with the following commands to stay productive during development:

#### Watch For Changes & Automatically Refresh Across Devices

```sh
$ gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices connected to your network.

### Build & Optimize

```sh
$ gulp
```

Build and optimize the current project, ready for deployment. This includes linting as well as image, script, stylesheet and HTML optimization and minification.

```sh
$ node server.js
```

Runs the included express server with node.
## License

Apache 2.0  
Based on code Copyright 2014 Google Inc
