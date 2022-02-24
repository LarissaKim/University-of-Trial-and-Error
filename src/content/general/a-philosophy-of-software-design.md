---
title: A Philosophy of Software Design
tags:
  - notes
  - general
  - programming
layout: post.njk
---

# A Philosophy of Software Design

Source: A Philosophy of Software Design by John Ousterhout

**Problem decomposition**

- Divide a complex problem into pieces that can be solved independently

**Strategic programming**

- Great design, which also happens to work
- Solid codebase that facilitates future extensions

## 1. Understand the Pain Point

How will this provide value in people's lives?

## 2. Plan the Features

- What features will this product offer? Will they help provide value?
- What sub-features will help design/implement the main features?
- What sub-features will help design/implement the sub-features?

Visually organize the features/sub-features blueprint (UX design)

## 3. Build the Sub-Components

Write a step-by-step sequence of how sub-components will be built using code terminology.

### **Design it twice**

Take a couple of alternative designs and pick the cleanest one instead of implementing the first idea that comes to mind.

Each method should do one thing and do it completely.

If a method needs to be split up, factor out a subtask. Both child and parent methods should be implemented without the need to understand each other's methods.

Chose precise, unambiguous, and intuitive names for variables, methods, etc.

Create an image

- Find a few words that capture the most important aspects
- If someone sees this name in isolation (no declaration, documentation, code), how closely will they be able to guess that the name refers to? Is there some other name that will paint a clearer picture?

Boolean variable names should always be predicates

- 1. Define the class' interface. Sketch out a few of the most important methods. Pick approaches that are radically different from each other.
- 2. Make a list of pros and cons of each one. The interface should be easy to use for higher-level software.
  - Does one alternative have a simpler interface than another?
  - Is one interface more general-purpose than another?
  - Does one interface enable a more efficient implementation that another?
- 3. Identify the best design (or combine multiple alternatives into a new one)

## 4. Clean Up and Refactor

Bring pieces of code together if:

- information is shared
- it will simplify the interface
- it eliminates duplication (DRY)
  - If the repeated snippet is long, factor it into a spearate method (if the method has a simple signature)
  - Refactor code so it only needs to be executed in one place
- they are used together (bi-directional only)
- they overlap conceptually (a simple higher-level category includes both pieces of code)
- it's hard to understande one of the pieces of code without looking at the other

## 5. Design the Interface

Plan the most user-friendly way to display information to the user (wireframes, prototypes)

## 6. Start Writing Code

Write the comments first

- New class: write the class [interface comment](#interface-comments)
- Write interface comments and signatures for the most important public methods (leave method bodies empty)
- Iterate until the basic structure feels right
- Write declarations and comments for the most important class instance variables in the class
- Fill in the bodies of the methods, adding [implementation comments](#implementation-comments) as needed
- Additional methods: write the interface comment before the method body
- Additional instance variables: fill in the comment at the same time as the variable declaration is written

---

## Comments

Comments capture information that was in the mind of the designer but couldn't be represented in the code.

Comments should describe things that aren't obvious from the code.

- Use different words in the comment from thsoe in the name of the entity being described. Pick words that provide additional information about the entity's meaning.
- A comment is worthless if someone who has never seen the code could write the code just by looking at the comment
  Decide on conventions for commenting
- What will be commented
- What format will be used for comments
  Comment maintenance
- Keep comments near the code they describe
- Avoid comment duplication; document each design decision only once

### Lower-level comments

Lower-level comments add precision by clarifying the exact meaning of the code.

- What are the units for this variable?
- Are the boundary conditions inclusive or exclusive?
- If a null value is permitted, what does it imply?
- If a variable refers to a resource that must eventually be freed or closed, who is responsible for freeing or closing it?
- Are there certain properties that are always true for this variable?

### Higher-level comments

Higher-level comments enhance intuition. They clarify how specific code statements relate to the overall goal.

- What is this code trying to do? (Why is this code executed?)
- What is the simplest thing you can say that explains everything in the code?
- What is the most important thing about this code?

### Interface comments

Interface comments provide information that someone needs to know in order to use a class or method.

- **Class**: the comment describes the overall abstraction provided
- **Method or function**: the comment describes its overall behaviour, its arguments and return value (if any), constraints on or dependencies between arguments, side effects (affects future behaviour of the system but is not part of the result) or exceptions it generates, and any other requirements (pre-conditions) the caller must satisfy before invoking the method.

### Implementation comments

Implementation comments describe what the code is doing, not how it's doing it. They are written inside a method or function.

### Data structure member comments

Data structure member comments describe what a variable represents, not how it is manipulated in the code.

### Cross-module comments

Cross-module comments describe dependencies that cross module boundaries.

- Allows for identification of all other places that must be modified if changes are made in that module

## Exceptions

### _Define errors out of existence_

The normal behaviour of an operation handles all situations so thereis no exceptional condition to report

### Mask exceptions

An exception condition is detected and handled at a low-level in the system so higher levels of software don't need to be aware of it

### Exception aggregation

A single handler handles many exceptions

### Application crash

Print diagnostic information then abort the application for errors that are difficult or impossible to handle and _don't occur very often_

## Testing

A successful test suite:

- is integrated into the development cycle
- targets only the most important parts of the codebase
- provides maximum value with minimum maintenance costs

The cost of a unit test is determined by the amount of time spent on

- refactoring the test when you refactor the underlying code
- running the test on each code change
- dealing with false alarms raised by the test
- reading the test when trying to understand the behaviour of the underlying code

#### Foundational attributes of a good automated test

- Protection against regressions

  How good the test can detect bugs (regressions). The more code the test executes, the higher the chance it will reveal a bug.

- Resistance to refactoring

  How well a test can sustain code refactoring without producing a false positive

- Fast feedback: how quickly the test executes

#### Black-box method

- Examines the functionality of a system without knowing its internal structure
- Built around specifications and requirements (what the application is supposed to do)

#### White-box method

- Verifies the application's inner workings
- Built around the source code

User black-box testing methods when writing tests and white-box methods when analyzing the tests.

Writing tests first makes sense when fixing bugs.

- Before fixing a bug, write a unit test that fails because of the bug.
- Fix the bug and make sure the unit test now passes.

Name each test as if you were telling a story about the problem the code helps to solve. It should be cohesive and meaningful to a non-programmer who is familiar with the problem domain. Separate words in the test name by underscores, and don't include the name of the method under test in the test name.

#### AAA pattern

- **Arrange**: bring the system under test (SUT) and its dependencies to a desired state
- **Act**: call the methods on the SUT, pass the prepared dependencies, and capture the output value (if any)
- **Assert**: verify the outcome (the return value, final state of the SUT and its collaborators, methods called by SUT on those collaborators)

## Consistency

Consistency creates cognitive leverage: once you learn how something is done in one place, you can use that knowledge to immediately understand other places that use the same approach.

- Create a document that lists the most important overall conventions (e.g., coding style guidelines)
- Enforce by using a tool that checks for violations and make sure code can't be commited to the repo unless it passes the checker
- Enforce with code reviews

## Complexity

Complexity is anything that makes it hard to understand and modify the structure of a system.

### Symptoms

**Change amplification**

- a simple change requires code modifications in many different places

**Cognitive load**

- how much a developer needs to know in order to complete a task

**Unknown unknowns**

- it is unclear what code needs to be modified, or what information must be considered in order to make those modifications

### Causes

**Dependencies**

- when a given piece of code can’t be understood and modified in isolation; the code relates in some way to other code, and the other code must be considered and/or modified if the given code if changed

**Obscurity**

- when important information is not obvious

### Solutions

- Making code simpler and more obvious (e.g. eliminate special cases, use identifiers consistently)
- Encapsulation/modular design (i.e. work can be done on one module without having to understand other modules)
