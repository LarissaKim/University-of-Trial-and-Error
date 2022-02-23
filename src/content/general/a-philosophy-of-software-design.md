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

If a method needs to be split up, factor our a subtask. Both child and parent methods should be implemented without the need to understand each other's methods.

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

- New class: write the class interface comment
- Write interface comments and signatures for the most important public methods (leave method bodies empty)
- Iterate until the basic structure feels right
- Write declarations and comments for the most important class instance variables in the class
- Fill in the bodies of the mthods, adding implementation comments as needed
- Additional methods: write the interface comment before the method body
- Additional instance variables: fill in the comment at the same time as the variable declaration is written

---

### Comments

Comments capture information that was in the mind of the designer but couldn't be represented in the code.

Comments should describe things that aren't obvious from the code

- Use different words in the comment from thsoe in the name of the entity being described. Pick words that provide additional information about the entity's meaning.
- A comment is worthless if someone who has never seen the code could write the code just by looking at the comment
  Decide on conventions for commenting
- What will be commented
- What format will be used for comments
  Comment maintenance
- Keep comments near the code they describe
- Avoid comment duplication; document each design decision only once

#### Lower-level comments

Lower-level comments add precision by clarifying the exact meaning of the code

- What are the units for this variable?
- Are the boundary conditions inclusive or exclusive?
- If a null value is permitted, what does it imply?
- If a variable refers to a resource that must eventually be freed or closed, who is responsible for freeing or closing it?
- Are there certain proteries that are always true for this variable?

#### Higher-level comments

Higher-level comments enhance intuition. They clarify how specific code statements relate to the overall goal

- What is this code trying to do? (Why is this code executed?)
- What is the simplest thing you can say that explains everything in the code?
- What is the most important thing about this code?

#### Interface comments

Interface comments provide information that someone needs to know in order to use a class or method

- **Class**: the comment describes the overall abstracted provided
- **Method or function**: the comment describes it soverall behaviour, its arguments and return value (if any), constraints on or dependencies between arguments, side effects (affects future behaviour of the system but is not part of the result) or exceptions it generates, and any other requirements (pre-conditions) the caller must satisfry before invoking the method.
