- CRA가 아닌 npm이나 yarn을 이용해 리액트와 타입스크립트를 설치하고 코드를 작성한 뒤, 어플리케이션을 실행하면 에러가 발생하는데 ESLint의 기본 parser는 ECMA 버전이 5로 설정되어있기 때문에 버전 5 이후의 문법이나 Typescript 문법은 파싱하면서 에러를 발생한다고 한다. 
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
