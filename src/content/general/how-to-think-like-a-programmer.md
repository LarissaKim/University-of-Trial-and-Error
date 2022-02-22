---
title: How To Think Like A Programmer
tags:
  - notes
  - general
  - programming
layout: post.njk
---

# How To Think Like A Programmer

Source: [How To Think Like A Programmer](https://www.youtube.com/watch?v=azcrPFhaY9k)

Programming isn't about languages. It's about solving problems and explaining things to the idiot computer.

##### HOW before WHAT

Write out concepts first, the convert to code later. Understand the problem you're trying to solve.

Comments don't explain code to the programmer. Code explains comments to the computer.

Algorithm -> Comments -> Code

Debugging

- Don't start with the solution
- Did you tell it what do to incorrectly? Or to do the wrong thing?
- Write code defensively
- What are you not understanding? Start by truly understanding the problem

Problem -> New tool -> Algorithm -> Comments -> Code

### New variable

- name
- type: type of data
- initVal: starting value

#### Algorithm

Create a variable called **`name`** of type **`type`** that starts with the value **`initVal`**

### Output

- message: text to display

#### Algorithm

Output the text **`message`**

### Input

- variable: stores user input
- message: question to user

#### Algorithm

Ask the user **`message`** and store the answer in **`variable`**

### Convert to integer

- oldVariable: the non-integer format
- intVariable: the integer result

#### Algorithm

Convert **`oldVarible`** to integer and store in **`intVariable`**

### While loop

- sentry: controls the loop
- initialization code: initialize sentry
- condition: if true, causes loop to repeat, otherwise causes loop to stop
- change code: changes sentry to trigger condition

#### Algorithm

Initialize **`sentry`** with **`initialization code`** then ocntinue to loop as long as **`condition`** is true. Inside the loop, change **`sentry`** with **`change code`**

##### Examples

```python
correct = "Python"
tries = 0

keepGoing = True
while(keepGoing):
    tries = tries + 1
    print("try #", tries)

    guess = input("What is the password? ")
    if guess == correct:
        print("That's correct! Here's the treasure!")
        keepGoing = False

    elif tries >= 3:
        print("Too many wrong tries. Launching the missiles")
        keepGoing = False
```

```js
const correct = "JavaScript";
let tries = 0;
let keepGoing = true;

while(keepGoing):
    tries = tries + 1;
    console.log("try #", tries);

    const guess = window.prompt("What is the password? ");
    if (guess === correct) {
        console.log("That's correct! Come on in!");
        keepGoing = false;
    } else if (tries >= 3) {
        console.log("Too many wrong tries. Launching the missiles");
        keepGoing = false;
    }
```

### For loop

- sentry: int variable that controls the loop
- start: start int value of sentry
- finish: end int value of sentry
- change: int to add to sentry at each pass

#### Algorithm

Begin with **`sentry`** at **`start`** and add **`change`** to sentry on each pass until **`sentry`** is greater than or equal to **`finish`**

- Lists and tuples
- String manipulation (w/ pre-existing object)
- Working w/ built-in help
- List interations
- Functions (scope, parameters, return)
- Objects

https://skorks.com/2010/04/on-the-value-of-fundamentals-in-software-development/

- coupling
- cohesion
- abstraction
- dependency injection
- lazy loading
- optimistic locking
- MVC
- arrays
- hashes
- trees
- sorting
- searching
- some graph algorithms
- caching
- certain object oriented concepts
- implications of using them on small and large data sets
- common problems they apply to
- limitations and how to overcome them
