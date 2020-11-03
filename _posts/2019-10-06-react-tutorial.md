---
layout: post
title: "React 튜토리얼 학습"
date: 2019-10-06 20:15:42 +0900
update: 2019-10-08 21:16:52 +0900
categories: ['react']
published: false
---

* TOC
{:toc}

# 계기와 목적

이 글은 리액트 공심 홈페이지에 있는 튜토리얼을 읽고 따라한 내용을 정리한다.

* 사이드 프로젝트를 진행하면서 프론트엔드 개발 능력이 필요했다. 
* HTML로 코드를 짜다가 왜 이렇게 코딩을 해야 하는지 짜증이 났다.
* 그러다 문득 리액트나 뷰가 떠올랐다.
* 리액트 공식 홈페이지에 들어 가서 리액트가 무엇인지 어떻게 써야 하는지 알아보기 위해 튜토리얼을 따라하기로 마음 먹었다.

# 참고한 글

[React Tutorial](https://reactjs.org/tutorial/tutorial.html)

# Overview

## What is React?

**리액트는 UI를 만들기 위해 사용하는 자바스크립트 라이브러리다**. 컴포넌트라고 부르는 작고 독립된 코드 조각을 이용해서 복잡한 UI를 구성할 수 있다.

리액트에는 컴포넌트 종류가 몇 가지 있는데, 그 중에서 `React.Component`라는 서브클래스부터 시작한다:

```react
class ShoppingList extends React.Component {
	render() {
		return (
			<div className="shoppint-list">
				<h1>Shopping List for {this.props.name}</h1>
				<ul>
					<li>Instagram</li>
					<li>WhatsApp</li>
					<li>Oculus</li>
				</ul>
			</div>
		);
	}
}
```

화면에 무엇을 나타내고 싶다면 컴포넌트를 사용하면 된다. 데이터가 바뀌면, Reacts는 업데이트 해서 컴포넌트를 리렌더링 해준다.

위 코드에서 `ShoppingList`는 React component class 또는 React component type이다. 컴포넌트는 `props`(short for "properties")라고 부르는 파라미터를 받아서 `render` 메서드를 통해 views를 리턴한다.

`render` 메서드는 스크린에서 보고 싶은 description을 리턴한다. React는 이러한 description을 이용해서 결과를 보여준다. `render` 메서드는 React element를 리턴하는데 이것은 무엇을 렌더해야 하는지에 대한 간단한 description이다. 대부분의 React 개발자들은 "JSX"라고 부르는 신택스를 사용한다. JSX를 사용하면 코드 구조를 쉽게 쓸 수 있다. `<div />` 신택스는 빌드 타임 때 `React.createElement('div')`로 바뀐다.

위 코드의 리턴문은 아래 코드와 동일하다:

```react
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

React element는 자바스크립트 object라서 변수로 할당하거나 프로그램 내에서 전달할 수 있다.

위 코드 에서 `ShoppingList`는 오직 빌트인 DOM 컴포넌트(`<div />` 또는 `<li />`) 렌더링만 한다.  그러나 커스텀 React 컴포넌트를 구성하거나 렌더할 수도 있다. 예를 들어, shopping list 전체 코드를 `<ShoppingList />`라고 지칭해서 사용할 수 있다. 각각의 React 컴포넌트는 캡슐화되며 독립적으로 작동할 수 있다. 이러한 점 덕분에 간단한 컴포넌트로 복잡한 UI를 구성할 수 있게 되는 것이다. 

## Passing data through props

`Board`의 `renderSquare` 메서드에서 `value`라는 prop을`Square`에게 전달할 수 있도록 코드를 수정한다:

```react
// before
class Board extends React.Component {
	renderSquare(i) {
		return <Square />;
	}
}
```

```react
// after
class Board extends React.Component {
	renderSquare(i) {
		return <Square value={i} />;
	}
}
```

`Square`의 `render` 메서드가 `value`라는 prop을 전달받을 수 있도록 코드를 수정한다:

```react
// before
class Square extends React.Component {
	render() {
		return (
			<button className="square">
				{/* TODO */}
			</button>
		);
	}
}
```

```react
// after
class Square extends React.Component {
	render() {
		return (
			<button className="square">
				{this.props.value}
			</button>
		);
	}
}
```

렌더된 아웃풋을 보면 각 정사각형에 숫자가 써 있는 것을 볼 수 있다.

축하한다! 방금 prop을 parent `Board` 컴포넌트에서 child `Square` 컴포넌트로 전달했다. prop을 전달하는 것은 React 앱에서 parents에서 children으로 정보가 흐르는 것과 같다.

## Making an interactive component

`Square` 컴포넌트를 클릭하면  "X"라는 값을 채우도록 만들자. 먼저 `Square` 컴포넌트의 `render()` 함수에서 리턴되는 버튼 태그를 수정한다:

```react
// before
class Square extends React.Component {
	render() {
		return (
			<button className="square">
				{this.props.value}
			</button>
		);
	}
}
```

```react
// after
class Square extends React.Component {
	render() {
		return (
		  <button className="square" onClick={function() { alert('click'); }}>
				{this.props.value}
			</button>
		);
	}
}
```

이제 정사각형을 클릭하면 브라우저에서 alert를 볼 수 있다.

다음 단계로 들어가자. `Square` 컴포넌트가 클릭되면 클릭된 사실을 기억하고 "X" 마크를 채웠으면 좋겠다. 무언가를 기억하기 위해서 컴포넌트는 **state**를 사용한다.

React 컴포넌트는 생성자에 `this.state`를 설정해두면 state를 가질 수 있다. `this.state`는 반드시 private이어야 한다. `Square`의 현재 값을 `this.state`에 저장하고 `Square`가 클릭되면 바꾸도록 만들자.

먼저 클래스에 생성자를 추가해서 state를 초기화할 수 있게 만든다:

```react
// before
class Square extends React.Component {
	render() {
		return (
		  <button className="square" onclick={() => {alert('click')}}>
				{this.props.value}
			</button>
		);
	}
}
```

```react
// after
class Square extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
	}

	render() {
		return (
		  <button className="square" onclick={() => {alert('click'}}>
				{this.props.value}
			</button>
		);
	}
}
```

> **Note**
> 자바스크립트 클래스에서 서브클래스의 생성자를 정의할 때는 항상 `super` 메서드를 호출해야 한다. `constructor`를 가지는 모든 React 컴포넌트 클래스는 반드시 `super(props)`를 호출하는 코드로 시작해야 한다.

이제 클릭되었을 때 현재 state의 값을`Square`의 `render` 메서드가 보여주도록 코드를 수정한다:

* 버튼 태그에서 `this.props.value`를 `this.state.value`로 대체한다.
* `onClick={...}` 이벤트 핸들러를 `onClick={() => this.setState({value: 'X'})}`로 대체한다.
* 더 나은 가독성을 위해 `className`과 `onClick` props를 라인을 분리한다.

위와 같은 변화를 거친 코드는 다음과 같다:

```react
class Square extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
		}
	}

	render() {
		return (
			<button
				className="square"
				onClick={() => this.setState({value: 'X'})}
			>
				{this.state.value}
			</button>
		);
	}
}
```

`Square`의 `render` 메서드에 있는 `onClick` 핸들러가 `this.setState`를 호출한다는 것은, 버튼이 클릭될 때마다 리액트가 `Square`를 다시 렌더하도록 만든 것이다. 업데이트 이후에 `Square`의 `this.state.value`가 `'X'`로 되기 때문에, 게임 보드에서 `X`를 볼 수 있게 되는 것이다.

# Completing the game

게임을 완성하려면 보드에 "X"와 "O"를 번갈아 배치해야 하며 승자를 결정하는 방법 또한 정해야 한다.

## Lifting state up

현재 각각의 정사각형 컴포넌트는 게임의 상태를 소지하고 있다. 승자를 판단하기 위해서 9개 정사각형의 값을 한 곳에서 관리할 것이다.

`Board`가 각각의 `Square`에게 `Square`의 상태를 물어보도록 할 수도 있지만, 좋지 않다. 왜냐하면 코드가 이해하기 어렵고, 버그에 취약하며 리팩토링하기 어려워지기 때문이다. 대신에 가장 좋은 방법은 게임의 상태를 `Suqare`의 parent인 `Board` 컴포넌트에 저장하는 것이다. `Board` 컴포넌트는 `Square`에게 prop을 전달하여 무엇을 보여줘야 할지 말할 수 있다.

> Tell, don't ask.

여러 children으로부터 데이터를 수집하거나 두 개의 child 컴포넌트가 서로 소통하게 하려면 공유할 수 있는 stateㅇ를 child의 parent 컴포넌트에 선언해야 한다. parent 컴포넌트는 props를 이용하여 state를 children에게 내려보낼 수 있다. 이렇게 되면 child 컴포넌트들은 각 child 컴포넌트끼리도 동기화되고 parent 컴포넌트와도 동기화된다.

state를 parent 컴포넌트에 올려보내는 것은 React 컴포넌트를 리팩토링할 때 흔히 사용되는 방법이다.

`Board`에 constructor를 추가하고, 초기 state가 각 9개의 `Square`에 해당하는 null 값을 가진 배열을 포함하도록 만들자.

```react
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
		}
	}
}
```

이전에 실습했던 prop passing 메커니즘을 한 번 더 사용할 것이다. 이제 `Board`가 각각의 `Square`에게 현재 값(`'X'`, `'O'`, `null`)을 전달하도록 수정할 것이다. `Board`의 `renderSquare` 메서드가 `Board`의 state를 읽어들이도록 만들자:

```react
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
		}
	}

	renderSquare(i) {
		return <Square value={this.state.squares[i]} />;
	}
}
```

위 코드에 의해 이제 각각의 `Square`는 `'X'`, `'O'`, `null`과 같은  `value` prop을 받게 된다.

`Square`가 클릭될 때 발생하는 일을 바꿔야 한다. `Board` 컴포넌트는 어떤 정사각형들이 채워져 있는지 알고 있다. 우리는 `Square`가 `Board`의 상태를 업데이트하는 방법을 만들어야 한다. state는 private하므로 `Board`의 state를 `Square`가 직접 업데이트할 수는 없다.

대신에, `Board`에서 `Square`로 함수를 내려보낼 것이다. 그리고 나서 `Square`가 클릭되면 그 함수를 호출하도록 만들 것이다. `Board`의 `renderSquare` 메서드를 수정하자:

```react
class Board extends React.Component {
	...
	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
			/>
		);
	}
}
```

> **Note**
>
> 괄호를 추가하면, JavaScript가 `return` 뒤에 세미콜론을 삽입해서 코드가 깨지는 것을 막을 수 있다.

`Board`에서 `Square`로 두 개의 props를 내려보낸다: `value` 및 `onClick`. `onClick` prop은 `Square`가 클릭될 때 호출할 수 있는 함수다. `Square`에 다음과 같은 변경사항을 추가할 것이다:

* `Square`의 `render` 메서드에서 `this.state.value`를 `this.props.value`로 대체한다.
* `Square`의 `render` 메서드에서 `this.setState()`를 `this.props.onClick()`으로 대체한다.
* `Square`의 `constructor`를 삭제한다. 왜냐하면 `Square`는 더 이상 게임의 state를 기록하지 않기 때문이다.

변경사항을 반영한 코드는 다음과 같다:

```react
class Square extends React.Component {
	render() {
		return (
			<button
				className="square"
				onClick={() => this.props.onClick()}
			>
				{this.props.value}
			</button>
		);
	}
}
```

이제 `Square`가 클릭되면 `Board`가 전달한 `onClick` 함수가 호출된다. 전체 과정을 복습하면 다음과 같다:

1. 빌트인 DOM `<button>` 컴포넌트에 있는 `onClick` prop은 React가 click event listener를 셋업하도록 말한다.
2. 버튼이 클릭되면, React는 `Square`의 `render` 메서드에 정의된 `onClick` event handler를 호출한다.
3. 이 event handler는 `this.props.onClick()`을 호출한다. `Square`의 `onClick` prop은 `Board`에 의해 구체화된다.
4. `Board`가 `onClick={() => this.handleClick(i)}`을 `Square`로 전달했기 때문에 `Square`는 클릭될 때 `this.ahdnleClick(i)`를 호출한다.
5. `handleClick()` 메서드는 아직 정의하지 않았기 때문에 코드가 충돌한다(오류가 난다). 지금 정사각형을 클릭하면 "this.handleClick is not a function"과 같은 빨간색 에러 메시지가 뜰 것이다.

> **Note**
>
> DOM `<button>` 요소의 `onClick` 속성(attribute)은 React에서 특별한 의미를 가진다. 왜냐하면 DOM `<button>`은 빌트인 컴포넌트이기 때문이다. `Square` 같은 커스텀 컴포넌트를 사용한다면 원하는 대로 임의로 네이밍을 해도 된다. 예를 들어, `Square`의 `onClick` prop이나 `Board`의 `handleClick` 메서드는 이름을 다르게 지어도 코드가 동일하게 동작한다. React는 통상적으로 event를 대표하는 prop에 대해서는 `on[Event]`라는 네이밍을 하고, event handler 메서드에는 `handle[Event]` 네이밍을 사용한다.

`Board` 클래스에 `handleClick`을 추가하자:

```react
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
		};
	}

	handleClick(i) {
		const squares = this.state.squares.slice();
		squares[i] = 'X';
		this.setState({squares: squares});
	}

	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
			/>
		);
	}
	
	render() {
		const status = 'Next player: X';

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}
```

이제 예전처럼 클릭이 가능해졌다. 그러나 이전과 달리 state가 각 `Square` 컴포넌트가 아닌 `Board` 컴포넌트에 저장되어 있다. `Board`의 상태가 변경되면, `Square` 컴포넌트들은 자동으로 재렌더한다. `Baord` 컴포넌트에 있는 모든 정사각형의 state를 유지하면 승자를 결정할 수 있다.

`Square` 컴포넌트가 더 이상 state를 유지하지 않기 때문에, `Square` 컴포넌트는 `Board` 컴포넌트로부터 값을 받고 `Board` 컴포넌트에게 클릭되었다는 사실을 알린다. React 용어에서 이러한 `Square` 컴포넌트를 **controlled components**라고 부른다. `Board`는 `Square` 컴포넌트에 대해 완전히 제어할 수 있다.

기존 배열을 수정하는 대신에 `.slice()` 메서드를 호출하여 `squares` 배열을 복사한 다음 수정하는 것에 대해 주의하라. 왜 `squares` 배열을 복사했는지는 다음 섹션에서 설명한다.

## Why Immutability is important

데이터를 수정하는 방법은 크게 2가지가 있다. 첫 번째 방법은 데이터의 값을 직접 수정해서 데이터를 변경하는 것이다. 두 번째 방법은 데이터를 복사해서 복사한 데이터를 변경해서 사용하는 것이다(=데이터를 원하는 변경 사항이 반영된 새 복사본으로 바꾸는 것).

**Data change with mutation**:

```react
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}
```

**Data Change without mutation**:

```react
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, plyaer, {score: 2});
// Now player is unchnaged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2};
// See details: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
```

최종 결과는 같지만 기존 데이터를 변경하지 않는 방법을 사용하면 다음과 같은 이점을 어들 수 있다.

**Complex features become simple**:

불변성(immutability)은 복잡한 기능을 더 쉽게 구현할 수 있게 만든다. 이 튜토리얼 이후에 우리는 "time travel(시간 여행)" 기능을 구현해서 tic-tac-toe 게임을 복기하고 이전에 둔 수로 돌아갈 것이다. 이러한 undo 및 redo 기능은 애플리케이션에서 흔한 요구사항이다. 데이터를 직접 변경하는 것을 피하면 게임의 과거 역사를 손상되지 않은 채로 접근할 수 있고 다시 재사용할 수도 있다.

**Detecting changes**:

변경 가능한 객체의 변화를 감지하는 것은 어렵다. 왜냐하면 말 그대로 직접 변경 가능하기 때문이다. 객체의 변화를 감지하려면 변경 가능한 객체가 변경되지 않았던 객체 복사본과 비교 가능해야 하며 전체 객체 트리를 (시간에 구애받지 않고) 왔다 갔다(traverse)할 수 있어야 한다.

불변 객체의 변화를 감지하는 것은 훨씬 더 쉽다. 참조 중인 불변 객체가 이전 객체와 다르다면, 객체는 변경된 것이다.

**Determining when to re-render in React**:

불변성의 주요 이점은 React에서 pure component를 만드는데 도움이 된다는 것이다. 불변 데이터는 변화를 감지하기 쉽기 때문에 컴포넌트가 재렌더해야 하는지 아닌지 알 수 있다.

## Function components

이제 `Square`가 **function component**가 되도록 수정할 것이다.

React에서 **function component**는 오직 `render` 메서드만 갖고 있고 자기 자신의 state가 없는 컴포넌트를 쉽게 작성할 수 있는 방법이다. `React.Component`를 상속하는 클래스를 정의하는 대신에, `props`를 인풋으로 받고 렌더해야 하는 것을 리턴하는 함수를 작성할 수 있다. 함수 컴포넌트는 클래스보다 쓰기 간편하며, 많은 컴포넌트들이 이러한 함수 컴포넌트 방식으로 표현될 수 있다.

`Square` 클래스를 아래 함수로 대체하라:

```react
function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}
```

`this.props`를 `props`로 모두 변경했다. 그리고 `onClick={() => this.props.onClick()}`을 더 짧은 형태인 `onClick={props.onClick}`으로 변경했다.

## Taking turns

"O"가 표시되도록 코드를 수정하자.

처음 두는 수는 "X"를 기본값으로 사용할 것이다. 이 기본값은 `Board`의 `constructor`에서 initial state를 수정하여 설정할 수 있다:

```react
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}
...
```

플레이어가 움직일 때(move)마다 `xIsNext`(a bollean)이 뒤집어지며 어떤 플레이어가 다음 차례인지 결정하고, 게임의 상태가 저장될 것이다. `Board`의 `handleClick` 함수가 `xIsNext`의 값을 뒤집도록 코드를 수정하자:

```react
...
handleClick(i) {
	const squares = this.state.squares.slice();
	squares[i] = this.state.xIsNext ? 'X' : 'O';
	this.setState({
		squares: squares,
		xIsNext: !this.state.xIsNext,
	});
}
```

WIP: With this change, "X"


