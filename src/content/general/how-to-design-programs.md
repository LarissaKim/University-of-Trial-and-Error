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

## From Problem Analysis to Data Definitions

Identify the information that must be represented and how it is represented in the chosen programming language. Formulate data definitions and illustrate them with examples.

## Signature, Purpose Statement, Header

State what kind of data the function consumes and produces. Formulate a concise answer to the question: "What does this function compute?" Define a stub that lives up to the signature.

## Functional Examples

Work through the examples to illustrate the function's purpose.

## Function Template

Translate the data definitions into an outline of the function.

## Function Definition

- Function name
- Parameter
  Fill in the gaps in the function template. Exploit the purpose statement and the examples.

## Testing

Articulate the examples as tests and ensure that the function passes all. Doing so discovers mistakes. Tests also supplement examples; they help others read and understand the definition when the need arises.

Iterative Refinement: stripping away all inessential details at first and finding a solution for the remaining core problem

- A refinement step adds in one of these omitted detaisla and resolves the expanded problem, using the existing solution as much as possible
- An interation (repetition) of these refinement steps eventually leads to a complete solution
