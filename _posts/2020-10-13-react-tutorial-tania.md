---
layout: post
title: "리액트 튜토리얼 by Tania"
date: 2020-10-13 21:43:30 +0900
update: 2020-10-22 23:26:10 +0900
categories: ['react']
---

* TOC
{:toc}

# Reference

- [React Tutorial: An Overview and Walkthrough](https://www.taniarascia.com/getting-started-with-react/)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [https://medium.com/@_diana_lee/default-export와-named-export-차이점-38fa5d7f57d4](https://medium.com/@_diana_lee/default-export%EC%99%80-named-export-%EC%B0%A8%EC%9D%B4%EC%A0%90-38fa5d7f57d4)
- [array.map](https://devdocs.programmers.co.kr/javascript/global_objects/array/map)
- [How to deploy React App to Github Pages](https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f)

# 2W1H

## Q. Babel은 무엇인가?

자바스크립트 컴파일러이며 ES6를 (ES6가 지원되지 않는) 예전 브라우저에서 사용할 수 있게 해준다.

## Q. JSX는 무엇인가?

리액트 코드에서 HTML처럼 보이는 코드로써 JavaScript XML의 약자이다. JSX가 있으면 우리가 스스로 정의하는 XML 같은 태그를 만들고 사용할 수 있고 자바스크립트 표현식을 사용할 수 있다.

예를 들면:

```jsx
const heading = <h1 className="site-heading" key={index}>Hello, React</h1>
```

## Q. components란 무엇인가?

React에서 거의 대부분이 컴포넌트로 구성된다. 컴포넌트는 클래스 컴포넌트와 심플(=함수) 컴포넌트로 나뉜다.

대부분의 리액트 앱은 여러 개의 작은 컴포넌트를 갖고 있고 모든 컴포넌트는 메인 `App` 컴포넌트에서 불러온다. 컴포넌트는 보통 각각의 파일로 따로 존재한다.

## Q. `<script type="text/babel">`은 무슨 뜻인가?

Babel을 사용하려면 스크립트 태그에 타입을 필수적으로 표기해야 한다.

## Q. `create-react-app`을 터미널로 실행하는 방법은 무엇인가?

react-tutorial이라는 디렉토리 이름으로 create-react-app을 셋업한다:

```bash
npx create-react-app react-tutorial
```

새롭게 생성된 디렉토리로 이동해서 프로젝트를 실행한다:

```bash
cd react-tutorial && npm start
```

브라우저 창이 `localhost:3000`으로 열리면서 새로운 리액트 앱이 뜰 것이다.

## Q. npm과 npx의 차이점은 무엇인가?

npm(node package manager)은 패키지를 관리하는 도구이며 패키지 실행과는 관련이 없다. npx(node package execute)는 노드 패키지를 실행하는 도구이다.

npm은 그 자체로 어떤 패키지도 실행하지 않는다. npm으로 패키지를 실행하려면 `package.json` 파일에 있는 패키지를 명시해야한다.

npx는 명령어 인자가 `$PATH` 에 있는지 확인한 후에 실행한다. npx의 가장 큰 이점은 이전에 설치되지 않은 패키지를 실행할 수 있다는 것이다.

## Q. `/src` 디렉토리에는 어떤 코드가 담겨 있는가?

React 코드가 담겨 있다.

## Q. JSX에서 CSS 클래스를 추가할 때 왜 `class` 가 아닌 `className`을 사용하는가?

JSX는 자바스크립트에 가깝다. 따라서 JSX에는 자바스크립트 코드가 섞여 있다. 그런데 클래스라는 용어는 CSS뿐만 아니라 자바스크립트의 예약어이기도 하다. 따라서 JSX에서 `class` 라는 용어를 사용하면 자바스크립트의 예약어를 뜻하는 것으로 오해할 수 있기 때문에 사용하지 않고 `className`을 사용해서 CSS 클래스임을 분명하게 밝힌다.

## Q. JSX에서 property를 사용할 때 `onclick`을 사용하는가 `onClick`을 사용하는가?

JSX에서 property와 method는 모두 camelCase를 사용하므로 `onClick`이 맞다.

## Q. JSX에서 `<img >` 가 맞는가, `<img />` 가 맞는가?

JSX에서 셀프 클로징 태그는 반드시 슬래시로 끝나야 하므로 `<img />` 가 맞다.

## Q. JSX 안에 컬리 브레이스를 사용하면 JavaScript 표현식 중 무엇을 임베드할 수 있는가?

변수, 함수, 프라퍼티를 임베드할 수 있다. 예를 들면:

```jsx
const name = 'Tania'
const heading = <h1>Hello, {name}</h1>
```

## Q. js 파일에서 `export default App`은 무슨 뜻인가?

`export`는 해당 파일에 존재하는 모듈을 다른 파일에서 사용할 수 있도록 내보낸다는 뜻이다.

export에는 두 가지 종류가 있는데 `named`와 `default` 이다. 모듈 하나당 여러 개의 named exports가 가능하지만 default export는 오직 하나만 가능하다.

사용시 차이점은 import할 때이다. named export는 export된 이름과 동일하게 설정해야 한다. 물론 as를 써서 alias를 사용할 수 있긴 하다. 반면 default export는 처음부터 원하는 이름으로 설정할 수 있다.

정리하면 named export는 여러 값을 내보낼 때 유용하다. 반면 default export는 어떤 이름으로도 가져올 수 있다.

Airbnb JavaScript Style Guide에 따르면, 하나만 export하는 모듈이면 default export를 쓴다. default를 쓰면 읽기 편하고, 유지보수성이 향상되고, treeshaking(자바스크립트 맥락에서 쓰이는 용어로 dead code 제거하기)이 가능하다는 장점이 있다.

```jsx
// Table.js
export class TableA { /* ... */ }
export class TableB { /* ... */ }

// App.js
import {TableA, TableB} from './Table'

// Square.js
export default Square

// App.js
import Square from './Square' // or SquareShape from './Square'
```

> [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

> [https://medium.com/@_diana_lee/default-export와-named-export-차이점-38fa5d7f57d4](https://medium.com/@_diana_lee/default-export%EC%99%80-named-export-%EC%B0%A8%EC%9D%B4%EC%A0%90-38fa5d7f57d4)

## Q. 사용자가 정의한 컴포넌트는 왜 첫글자를 대문자로 쓰는가?

소문자로 시작하는 일반적인 HTML 요소와 구별하기 위해서이다.

## Q. App 클래스 컴포넌트에 Table 컴포넌트를 불러오는 예시 코드는 어떻게 쓸 수 있는가?

```jsx
// App.js
import React, {Component} from 'react'
import Table from './Table'

class App extends Component {
    render() {
        return (
            <div className="container">
                <Table />
            </div>
        )
    }
}

export default App
```

## Q. `TableHeader`라는 이름으로 테이블 헤더 HTML 코드를 담고 있는 심플 컴포넌트 예시는 무엇인가?

```jsx
// Table.js
import React, {Component} from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
            </tr>
        </thead>
    )
}
```

## Q. App 컴포넌트에서 child 컴포넌트인 Table에 데이터를 전달하려면 어떻게 해야 하는가?

데이터를 child 컴포넌트에 전달할 때는 props를 사용하면 된다. XML 태그에 props 데이터를 전달할 때는 `data-` attribute를 사용하면 된다. 이때 attribute(=property) 이름은 원하는 대로 정할 수 있다(단, 예약어는 피해야 한다). 여기서는 property 이름을 `characterData` 로 정한다. 데이터는 자바스크립트 표현식이므로 curly brace로 감싼다.

```jsx
// App.js

import React, {Component} from 'react'
import Table from './Table'

class App extends Component {
    render () {
        const characters = [ /* ... */ ];

        return (
            <div className="container">
                <Table characterData={characters} />
            </div>
    }
}
```

## Q. Table 컴포넌트에 전달된 데이터를 Table 컴포넌트가 접근하려면 어떻게 해야 하는가?

상위 컴포넌트인 App 컴포넌트에서 Table 컴포넌트로 데이터가 넘어 올 때는 Table 컴포넌트의 props에 전달된다. 따라서 Table 컴포넌트에서 전달된 데이터를 꺼내려면 props 객체 중에서 상위 컴포넌트에서 전달할 때 정했던 property 이름으로 destructuring 하면 된다.

```jsx
// Table.js

import React, {Component} from 'react'

class Table extends Component {
    render() {
        const {characterData} = this.props

        return (
            <table>
                <TableHeader />
                <TableBody characterData={characterData} />
            </table>
        )
    }
}
```

## Q. virtual DOM과 actual DOM은 어떤 연관이 있는가?

상위 컴포넌트가 하위 컴포넌트에 데이터를 전달하면 하위 컴포넌트의 props에는 전달된 데이터가 저장되어 있다. props에 저장된 데이터를 virtual DOM이라고 한다. virtual DOM은 actual DOM(실제 브라우저가 렌더링하는 DOM)에 데이터를 빠르고 효율적으로 동기화할 수 있도록 돕는다.

## Q. virtual DOM에 있는 props 데이터에 접근하려면 어떻게 해야 하는가?

특정 컴포넌트의 props에 있는 데이터가 virtual DOM의 데이터이다. 따라서 virtual DOM에 있는 데이터에 접근하려면 해당 컴포넌트의 props에 접근하면된다. 코드로 하면 다음과 같다: `this.props` . 만약 특정 컴포넌트에 전달한 데이터의 property 이름이 `characterData`라면 `this.props.characterData`로 바로 접근할 수 있다.

## Q. 심플 컴포넌트 `TableBody`에 데이터를 전달하려면 어떻게 해야 하는가?

TableBody 커스텀 태그에 `data-` attribute(=property)를 추가하면 된다.

```jsx
class Table extends Component {
    render() {
        const {characterData} = this.props

        return (
            <table>
                <TableHeader />
                <TableBody characterData={characterData} />
            </table>
        )
    }
}
```

## Q. TableBody가 props 데이터를 매개변수로 받고 props 데이터 중 characterData를 테이블 로우에 배치하려면 어떻게 해야 하는가?

심플 컴포넌트에 전달된 props 데이터를 사용하려면 함수의 매개변수를 추가해서 사용하면 된다.

```jsx
const TableBody = (props) => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}
```

## Q. map 함수는 어떻게 사용하는가?

map 함수는 array의 메소드이다. array의 모든 요소에 동일한 함수를 적용해서 새로운 값을 만들 때 map 함수를 사용한다. 따라서 map 함수 안에 array 각 요소에 적용할 콜백 함수를 인자로 넣어줘야 한다. ex. `map(functionA)`

예를 들어, 문자열로 구성된 array 값을 모두 숫자로 변환시키고자 한다면:

```jsx
const values = ['1', '2', '3']
let result = values.map(Number);

console.log(result);
// [1, 2, 3]
```

map 함수의 첫번째 인자는 콜백함수가 들어가고, 두번째 인자에는 array 요소의 index가 들어가고, 세번째 인자에는 array 자체가 들어간다.

따라서 object가 담긴 array에 map 함수를 적용할 때 해당 object의 index를 사용해야 한다면 다음과 같이 사용한다:

```jsx
const characterData = [
  {
    name: 'Charlie',
    job: 'Janitor',
  },
  {
    name: 'Mac',
    job: 'Bouncer',
  },
  {
    name: 'Dee',
    job: 'Aspiring actress',
  },
  {
    name: 'Dennis',
    job: 'Bartender',
  },
]

const rows = characterData.map((obj, index) => {
    return (
        <tr key={index}>
            <td>{obj.name}</td>
            <td>{obj.job}</td>
        </tr>
    )
})
```

> [https://devdocs.programmers.co.kr/javascript/global_objects/array/map](https://devdocs.programmers.co.kr/javascript/global_objects/array/map)

## Q. `map((row, index) => return { /* ... */ })` 함수는 무슨 뜻인가?

map 함수의 첫번째 인자는 array의 요소를 뜻한다. 따라서 row는 array에 담긴 각 요소를 뜻한다. map 함수의 두번째 인자는 array 요소의 index를 뜻한다.

결론적으로 위 질문의 함수는 array의 요소와 요소의 인덱스를 모두 활용해서 새로운 array를 만들겠다는 뜻이다.

> [https://devdocs.programmers.co.kr/javascript/global_objects/array/map](https://devdocs.programmers.co.kr/javascript/global_objects/array/map)

## Q. React에서 리스트를 만들 때는 반드시 key를 사용해야 하는 이유는 무엇인가?

왜냐하면 리스트에 key를 부여해야 리스트 내 각 아이템을 분별할 수 있기 때문이다. 리스트의 아이템을 조작하려면 key를 알아야만 가능하다.

> [https://www.taniarascia.com/getting-started-with-react/](https://www.taniarascia.com/getting-started-with-react/)

## Q. React 컴포넌트는 props를 왜 변경할 수 없는가?

모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다. 즉 props를 수정해서는 안 된다. 순수 함수는 입력값을 바꾸지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환한다.

순수 함수:

```jsx
function sum(a, b) {
    return a + b;
}
```

순수 함수가 아닌 함수:

```jsx
function withdraw(account, amount) {
    account.total -= amount;
}
```

> [https://ko.reactjs.org/docs/components-and-props.html](https://ko.reactjs.org/docs/components-and-props.html)

리액트의 컴포넌트는 자신의 state만 관리해야지 props는 관리할 수 없다. 왜냐하면 컴포넌트의 props는 사실상 부모 컴포넌트의 state이기 때문이다. 만약 컴포넌트가 props를 변경하면 부모 컴포넌트의 property도 변경되겠지만, 부모 컴포넌트가 재렌더링 되지는 않는다. 부모 컴포넌트가 재렌더링 되려면 부모 컴포넌트의 `setState()` 메소드가 실행되어야만 한다.

> [https://stackoverflow.com/questions/51435476/why-props-in-react-are-read-only](https://stackoverflow.com/questions/51435476/why-props-in-react-are-read-only)

## Q. state는 왜 장바구니 데이터로 비유할 수 있는가?

state는 구매를 결정하기 전에 자유롭게 물건을 추가하고 뺄 수 있는 쇼핑 카트라고 볼 수 있다. 마찬가지로 state는 데이터베이스에 뭔가를 추가하지 않고도 저장하거나 수정할 수 있는 장바구니 데이터를 뜻한다.

## Q. state를 이용해서 private data를 업데이트하는 메소드는 어떤 컴포넌트에 만들어야 하는가?

state를 가지고 있는 그 컴포넌트 내부에 메소드를 만들어야 한다.

## Q. state를 이용해서 private data를 업데이트하는 메소드는 함수 내부 코드에 어떤 빌트인 메소드를 사용해야 하는가?

`this.setState()` 메소드를 이용해서 state를 업데이트한다.

## Q. state를 업데이트하는 메소드를 하위 컴포넌트 `Table`에 전달하려면 어떻게 해야 하는가?

데이터를 props로 전달했던 것과 같은 방식으로 태그에 attribute를 추가해서 전달한다.

```jsx
class App extends Component {

    render() {
        const { characters } = this.state

        return (
            <div className="container">
                <Table characterData={characterData} removeCharacter={this.removeCharacter} />
            </div>
        )
    }
}
```

## Q. Table 컴포넌트에 전달된 state 업데이트 메소드를 TableBody 컴포넌트에 전달하는 방법은 무엇인가? 이때 Table 컴포넌트가 클래스 컴포넌트 또는 함수 컴포넌트 중 어떤 것이 더 적절할지 고려하라.

prop 방식을 그대로 사용하면 된다. 그런데 추가로, state를 갖고 있는 컴포넌트는 `App` 밖에 없으므로 Table 컴포넌트는 클래스 컴포넌트가 아닌 심플(=함수) 컴포넌트로 변경하는 것이 best practice이다.

```jsx
const Table = (props) => {
    const {characterData, removeCharacter} = props

    return (
        <table>
            <TableHeader />
            <TableBody characterData={characterData} removeCharacter={removeCharacter} />
        </table>
    )
}
```

## Q. TableBody에 prop으로 전달된 state 업데이트 메소드를 JSX에 onClick 버튼으로 임베드하는 방법은 무엇인가?

버튼 태그에 onClick 속성을 추가하고, onClick에 들어갈 함수를 props 객체에서 removeCharacter 메소드로 넣으면 된다.

```jsx
const TableBody = (props) => {
    const rows = this.props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}></td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>Delete</button>
                </td>
            </tr>
        )
    })

    return (
        <tbody>{rows}</tbody>
    )
}
```

이때, 테이블 로우(tr)에 들어가는 칼럼 데이터(td)의 수가 세 개가 되었으므로 TableHeader 컴포넌트도 헤더 로우의 칼럼 수를 세 개로 맞춰준다.

```jsx
const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Remove</th>
            </tr>
        </thead>
    )
}
```
