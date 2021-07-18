# FSM-Simulation

## get started

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3080
$ npm run dev

# build for production
$ npm run build
```

## For user account function, run the back-end server

[FSM Storage](https://github.com/s-elo/FSMStorage)

## Overall structure of the dirs

```
FSM-Simulation
├── build   // store bundled files for porduction
├── logs.md     // some of the logs of configurating webpack
├── node_modules    // npm packages
├── package-lock.json   // lock the versions of those npm libs
├── package.json    // related configs of this project
├── public  // including js, css, img files
├── README.md
├── views   // html pages of this project
└── webpack.config.js   // webpack configs
```

## Six html web pages (/views)

```
\views
├── design.html    // main page including design and code generator part
├── Instruction.html    // give the instruction of how to use this tool
├── Introduction.html    // introduction of FSM
├── login.html    // login page for account function
├── register.html    // register page for account function
└── simulator.html    // simulator page
```

## /public/js

```
js
├── account    // contains account logics handlers
|  ├── accountInit.js    // init some of the functions related to account function
|  ├── data    // CRUD operations of fsm data, get, save, delete.
|  ├── interceptor.js    // do sth before http request and after the response
|  ├── session    // handle the login and register logics
|  └── verifyToken.js    // verify the token to update login status and some renders
├── dataHandler
|  ├── clearStateDiagram.js    // clear the whole state diagram and the parameters table
|  ├── createLineTable.js    // create the right hand side table related to each line
|  ├── dataHandler.js    // to export all the functions of dataHandler dir
|  ├── initStateDiagram.js    // draw a whole state diagram according to the fsm data
|  ├── syncParaTable.js    // synchronize the parameter setting table according to the fsm data
|  └── updateData.js    // update the fsm data in localStorage
├── design    // relevant logics in  design part
|  ├── btnClick    // handle the buttons click events in design part, such as add, delete...
|  ├── drag    // handle the geometric logics when dragging SVG elements
|  ├── elmOperation    // handle SVG elements operations like clicking, double clicking...
|  ├── index.js    // to initailize the functions in design part such as binding events, handling account
|  ├── parameterSetting    // logics about paramenter setting table
|  └── preset.js    // handle some small functions once start this project
├── extends    // to extends some peripheral functions
|  └── colorControl.js    // theme changing logics
├── HDL    // handle all the HDL code generator logics
|  ├── clickBind.js    // binding all the click events of buttons in code generator part
|  ├── generatorUtils    // some helpers when generating the HDL code
|  ├── index.js    // init function
|  ├── Verilog    // logics of generating Verilog
|  └── VHDL    // logics of generating VHDL
├── otherPreset    // for other peripheral functions
|  └── index.js
├── simulator    // simulator page logics (manipulate Canvas)
|  └── index.js
├── index.js    // init the while process, including design part, code generator, and account
├── globalParams.js    // global params used in this project
└── utils.js    // global helpers in this project
```
