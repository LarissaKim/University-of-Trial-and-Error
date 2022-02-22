---
title: Writing Resilient Components
tags:
  - notes
  - react
layout: post.njk
---

# Writing Resilient Components

Source: [Writing Resilient Components](https://overreacted.io/writing-resilient-components/)

## Don't stop the data flow

_What needs to happen if props and state change?_

- Rendering
  - Read and do additional computations directly from props rather than via a copy from state
- Side Effects
  - For every method called in useEffect, check if it uses props or state
  - Ensure useEffect will re-run whenever props and state changes
  - Don't like to useEffect about dependencies

## Always be ready to render

A parent component re-rendering more often should not affect a child component's ability to render.

Stress-test to check if child breaks:

```js
useEffect(() => {
  // Don't forget to remove this immediately!
  setInterval(() => this.forceUpdate(), 100);
}, []);
```

## No component is a singleton

Showing or hiding a tree shouldn’t break components outside of that tree.

Stress-test to test component fragility:

```js
ReactDOM.render(
  <>
    <App />
    <App />
  </>,
  document.getElementById('root')
);
```

## Keep the local state isolated

Local state: an interaction that would not show in the other copy if the component was rendered twice
