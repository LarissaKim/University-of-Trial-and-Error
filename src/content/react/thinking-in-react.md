---
title: Thinking in React
tags:
  - notes
  - react
layout: post.njk
---

# Thinking in React

Source: [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

1. Draw boxes around every component and sub-component. Give them all names.
   - Each component should do one thing.
2. Build a static version using props (no state)
3. Identify the minimal set of mutable state needed
   It's not state if the data:
   - is passed in from a parent via props
   - remains unchanged over time
   - can be computed based on any other state/prop in the component
4. Identify which component mutates/owns this state

   - Identify every component that renders something based on that state
   - Find a common owner component
   - Either the common owner or another component higher up should own the state
   - Alternatively, a new component should be created above the common owner solely for holding the state

5. Add inverse data flow
