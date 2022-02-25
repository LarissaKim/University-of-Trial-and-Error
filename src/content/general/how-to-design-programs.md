---
title: How to Design Programs
tags:
  - notes
  - general
  - programming
layout: post.njk
---

# How to Design Programs

Source: [How to Design Programs](https://htdp.org/2018-01-06/Book/index.html)

Good programming is about systematically solving problems and conveying the system within the code. Programmers create programs for other people to read in the future. A good program reflects the problem statements and their important concepts. It comes with a concise self-description. Examples illustrate this description and relate it back to the problem. The examples ensure that the future reader knows why and how the code works.

### Designing Functions

Start with the connection between data and information; how to represent the relevant pieces of information as data and how to interpret data as information.

### Data definition

A collection of data (class) represented by a meaningful word; informs readers how to create elements of this class and how to decide whether a piece of data belongs to the collection.

---

## Design Process

### From Problem Analysis to Data Definitions

Identify the information that must be represented and how it is represented in the chosen programming language. Formulate data definitions and illustrate them with examples.

> A Temperature is a Number. Interpretation represents Celcius degrees.

### Signature, Purpose Statement, Header

**Signature**: a comment that tells the reader how many inputs the function consumes, from which classes they are drawn, and that kind of data it produces.

**Purpose Statement**: a comment that summarizes the purpose of the function (shortest possible answer to: "What does this function compute?")

- One purpose statement for the reader who may have to modify the code
- One purpose statement for the person who wishes to use the program but not read it

**Header**: a simplistic function definition

- One variable name fo each class of input in the signature
- Body of the function can be any piece of data from the output class

### Functional Examples

Illustrate the function's purpose with examples.

- Pick one piece of data from each input class from the signature and determine what you expect back.
- If a class has a finite range, pick examples from the range boundaries and from its interior.

### Function Template

Express the data definitions for the input(s) as a mix of English and programming language to create an outline for the function.

- Does the data definition distinguish among different sub-classes of data?

  The template needs as many conditional clauses as sub-classes.

- How do the sub-classes differ from each other?

  Use the differences to formulate a condition per clause.

- Do any of the clauses deal with structured values?

  Add appropriate selector expressions to the clause.

### Function Definition

- Function name
- Parameter: function input (unknown until function is applied)
- Expression (body): computes the output of the function for a specific input

### Testing

Articulate the examples as tests and ensure that the function passes all. Doing so discovers mistakes. Tests also supplement examples; they help others read and understand the definition when the need arises.

---

**Iterative Refinement**: stripping away all inessential details at first and finding a solution for the remaining core problem.

- A refinement step adds in one of these omitted details and resolves the expanded problem, using the existing solution as much as possible
- An interation (repetition) of these refinement steps eventually leads to a complete solution
