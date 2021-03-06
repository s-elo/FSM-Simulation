# 2021.06.04 (finished the basic webpack config)

## problems encountered

### 1. pack the JS files with different seperate chunks

    since the we got multiple html pages, each page needs different or the same js files;
    the entry of the webpack has to be multiple too;
    each entry named as a chunk with js file array;
    the js files in the array will be in a chunk

### 2. pack multiple html pages

    using the key:chunks of HtmlWebpackPlugin to include the js chunks that the page needs;

### 3. the first open page of devServer

    using openPage key to set (the path is the path after bundling in the build dir);

### 4. the entry js files in the array need to be in order

    the js files in the chunk array should be ordered with the dependency relation
    such that the globalParams.js is depended by the index.js and the following js files;
    so globalParams.js needs to be put in the first in the array;

### 5. mount the global data and libs at the window

    all the js files are bundled and modulized within a independent scope;
    to make the params in the globalParams.js accesible to all js files;
    put them all in the window, including jquery and clipboard;

## what to do next

### 1. pack the img and css

### 2. finish the rest html pages packing

### 3. being able to run normally either in dev or bundled status

# 2021.06.06 (can be run normally)

## problems encountered

### 1. pack the imgs in html

    the file-loader and url-loader will be in conflict;
    so we just remove the file-loader;

### 2. to extract the css files independently

    using a MiniCssExtractPlugin to do this;
    so the css imported in js will be packed independently;
    and using link tag to introduce the css file;

### 3. postcss-loader with high version(5)

    using webpack@5 to compatitablize it

## what to do next

### 1. using cdn to access the libs and bootstrap

### 2. hope can remove the 3 warnings...

    the chunks like bootstrap is too big

# 2021.06.09 (compression and compatibility)

### 1. img pack

    config the outputPath and publicPath in url-loader;
    and limit the size of the imgs;
    other wise the imgs will be encoded as base64 within the html
    which will make it so big

### 2. using CDN

    jquery, bootstrap and clipboard are used by accessing CDN now

### 3. compress the design.html

    replace the > and < using &#60; and &#62; then it was solved

# 2021.06.15(fix the HMR bug)

    webpack@5 has some problems to refresh the browser
    when the code is updated;
    since we got "browserslist" in package-json file;

    to sovle this, config the target option in webpack.config.js
    target: 'web';

    also remember to change it to development mode

# 2021.07.10

using cross-env to set the NODE_ENV value by package.json scripts
using this to realize different configs using one config file
