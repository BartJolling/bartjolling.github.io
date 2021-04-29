var shol = (function (sholInstance, undefined) {

    // Private instance of the Sass.js compiler
    var sass = null;

    /**
     * Constructor for the shol SassCompiler object
     * @param {Sass} sassInstance - Sass instance from sass.js
     */
    sholInstance.SassCompiler = function SassCompiler(sassInstance) {

        if (sassInstance !== undefined) {
            sass = sassInstance;
        } else {
            return new Error(`[shol][SassCompiler] A valid sassInstance must be defined.`);
        };

        /**
         * Compiles a theme from https://github.com/syntaxhighlighter
         * @param {string} themeName - Name of theme to compile to css
         */
        this.compileTheme = async function (themeName, callback) {
            await Promise.all([downloadThemeBase(), downloadTheme(themeName)]);
            callback(await compileThemePromise(themeName));
        };
    };

    // Private functions - manipulate files
    function monkeyPatchThemebase(baseContent) {
        //fix font-size - change from 1em to 0.8em to avoid vertical scrollbars
        var regex = /([.]syntaxhighlighter\s*\{[\s\S]*?font-size:\s)1em(\s!important;)/m;
        if (baseContent.match(regex)) {
            baseContent = baseContent.replace(regex,"$1"+"0.75em"+"$2");
        }

        return baseContent;
    }

    // Private functions - downloading, compiling and storing files 
    function downloadFilePromise(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.reject = reject
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(xhr.statusText));
                }
            };
            xhr.onerror = () => {
                var msg = '';

                if (xhr.status === 0) {
                    msg = 'Not connected. Verify Network.';
                } else if (xhr.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (xhr.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else {
                    msg = 'Uncaught Error.\n' + xhr.responseText;
                }

                console.log(`XHR Exception. Status: ${this.status}. Information: ${msg}`);

                reject(new Error(msg));
            }
            xhr.open("GET", url, true);
            xhr.send(null);
        });
    };

    function writeFilePromise(filename, content) {
        var promise = new Promise(function (resolve, reject) {
            sass.writeFile(filename, content, function (success) {
                if (success) {
                    resolve();
                } else {
                    reject(new Error(`Failed writing ${filename}`));
                }
            });
        });

        return promise;
    };

    function listFiles() {
        return new Promise(function (resolve) {
            sass.listFiles(function callback(list) {
                resolve(list);
            });
        });
    };

    function fileExists(filename) {
        return new Promise(function (resolve) {
            sass.listFiles(function callback(list) {
                resolve(list.includes(filename));
            });
        });
    };

    async function downloadThemeBase() {
        var filename = 'theme-base.scss';
        var url = `https://raw.githubusercontent.com/syntaxhighlighter/theme-base/master/${filename}`;

        var baseExists = await fileExists(filename);

        if (!baseExists) {
            var baseContent = await downloadFilePromise(url);

            baseContent = monkeyPatchThemebase(baseContent);

            return writeFilePromise(filename, baseContent);
        };
    };

    async function downloadTheme(themeName) {
        var filename = `theme-${themeName}.scss`;
        var url = `https://raw.githubusercontent.com/syntaxhighlighter/theme-${themeName}/master/theme.scss`;

        var themeExists = await fileExists(filename);

        if (!themeExists) {
            var themeContent = await downloadFilePromise(url);
            return writeFilePromise(filename, themeContent);
        }
    };

    function compileThemePromise(themeName) {
        return new Promise(function (resolve, reject) {
            var filename = `theme-${themeName}.scss`

            sass.options({ style: Sass.style.expanded }, function () {
                sass.compileFile(filename, function callback(result) {
                    if (result.status == 0) {
                        resolve(result.text);
                    } else {
                        reject(new Error(result));
                    }
                });
            });
        });
    };

    return sholInstance;
}(shol || {}));