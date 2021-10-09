## 첫번째 에러
CRA가 아닌 npm이나 yarn을 이용해 리액트와 타입스크립트를 설치하고 코드를 작성한 뒤, 어플리케이션을 실행하면 에러가 발생하는데 ESLint의 기본 parser는 ECMA 버전이 5로 설정되어있기 때문에 버전 5 이후의 문법이나 Typescript 문법은 파싱하면서 에러를 발생한다고 한다. 
npm으로 eslint-config-react-app 설치후, .eslintrc.json 파일을 루트 디렉토리에 만들어주고 아래와 같이 수정
```js
// .eslintrc.json일 경우
  {
    "extends": "react-app"
  }

// .eslintrc.js일 경우
  module.exports = {
    extends: ["react-app"]
  }
```

## 두번째 에러
webpack 설치후,  
```js
npm i -D webpack webpack-cli webpack-dev-server
```
webpack.config.js와 package.json에 기본적인 옵션 세팅
```js
// package.json
"start": "webpack serve --config ./webpack.config.js --mode development",

// webpack.config.js
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.[hash].js'
  },
}
```

npm start후에 에러 발생 (babel이 없어서 발생하는 문제)
```js
ERROR in ./src/index.js 7:2
Module parse failed: Unexpected token (7:2)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|
| ReactDOM.render(
>   <App />,
|   document.getElementById('root')
| );
```

babel 설치후 webpack.config.js 설정
```js
npm i -D babel-loader @babel/core @babel/preset-env

// 바벨 설치 후, webpack.config.js와 babel.config.js 설정
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
}

// babel.config.js
module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }]
  ]
}
```

하지만 타입스크립트와 css 로더가 없어 또 에러 발생
```js
ERROR in ./src/App.tsx 17:48
Module parse failed: Unexpected token (17:48)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders|
| function App() {
>   const [products, setProducts] = useState<Data[] | []>([]);
|
|   useEffect(() => {
 @ ./src/index.js 4:0-28 6:35-38

ERROR in ./src/index.css 1:5
Module parse failed: Unexpected token (1:5)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders> body {
|   margin: 0;
|   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
 @ ./src/index.js 3:0-21
```

index.css에서 발생한 에러는 로더 설치후, 설정해주면 사라짐
```
npm i -D mini-css-extract-plugin
```

App.tsx에서 발생한 에러는 웹팩에 타입스크립트 로더가 세팅이 안되서 발생한 문제. https://webpack.js.org/guides/typescript/ 을 참조해서 세팅함

하지만 다른 에러 발생

```js
ERROR in ./node_modules/axios/index.js 1:0-39
Module not found: Error: Can't resolve './lib/axios' in 'C:\Users\안재현\Documents\공부\test-project\react-config\node_modules\axios'
 @ ./src/api/api.ts 12:0-26 15:11-20 18:11-20 21:11-20 24:11-20 27:11-21
 @ ./src/App.tsx 8:0-43 13:8-22
 @ ./src/index.tsx 4:0-24 5:36-39

ERROR in ./node_modules/prop-types/index.js 14:19-55
Module not found: Error: Can't resolve './factoryWithTypeCheckers' in 'C:\Users\안재현\Documents\공부\test-project\react-config\node_modules\prop-types'
 @ ./node_modules/react-router-dom/esm/react-router-dom.js 6:0-35 45:14-30 46:14-28 47:18-32 48:25-39 49:15-31 90:14-30 91:14-28 92:25-39 93:14-29 206:15-34 206:36-52 206:54-70 206:72-86 207:16-35 207:37-53 207:55-69 207:71-86 208:13-26 213:13-27 214:13-27 215:12-28 303:24-39 306:21-37 307:17-33 308:15-34 308:36-52 308:54-68 309:11-25 310:14-28 311:14-30 312:15-29 313:12-26 314:11-30 314:32-48 314:50-64
 @ ./src/App.tsx 9:0-75 19:28-34 22:36-42 23:40-45 25:40-45 27:40-45 29:40-45
 @ ./src/index.tsx 4:0-24 5:36-39

ERROR in ./node_modules/react-dom/cjs/react-dom.development.js 17:14-38
Module not found: Error: Can't resolve 'object-assign' in 'C:\Users\안재현\Documents\공부\test-project\react-config\node_modules\react-dom\cjs'
 @ ./node_modules/react-dom/index.js 37:2-60
 @ ./src/index.tsx 2:0-33 5:0-15

ERROR in ./node_modules/react-dom/cjs/react-dom.development.js 19:14-42
Module not found: Error: Can't resolve 'scheduler/tracing' in 'C:\Users\안재현\Documents\공부\test-project\react-config\node_modules\rst-project\react-config\node_modules\react-dom\cjs'
 @ ./node_modules/react-dom/index.js 37:2-60
 @ ./src/index.tsx 2:0-33 5:0-15

ERROR in ./node_modules/react/cjs/react.development.js 16:14-38                                 roject\react-config\node_modules\react
Module not found: Error: Can't resolve 'object-assign' in 'C:\Users\안재현\Documents\공부\test-project\react-config\node_modules\react\cjs'
 @ ./node_modules/react/index.js 6:2-56
 @ ./src/index.tsx 1:0-26 5:16-35
```

발생 이유는 extensions 배열에 .ts와 tsx만 포함되어 있었기 때문. 그래서 .js도 추가

```js
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
```

수정후 웹팩 작동 이상무

## 세번째 에러(버그)
- npm start후 컴파일은 문제없이 되지만 번들링된 파일인 bundle.js가 보이지 않는다. 
아마 webpack.config.js에서 entry와 output의 경로를 잘못 설정해서 발생하는 문제인듯하다 

