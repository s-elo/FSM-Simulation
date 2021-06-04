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


