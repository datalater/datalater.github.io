---
layout: post
title: "React 튜토리얼 학습"
date: 2019-10-06 20:15:42 +0900
update: 2019-10-06 22:05:03 +0900
categories: ['react']
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

# What is React?

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

# Passing data through props

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

# Making an interactive component

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

WIP: Completing the Game부터 하면 됨.
