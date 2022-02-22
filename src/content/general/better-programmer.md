---
title: Becoming a Better Programmer
tags:
  - notes
  - general
  - programming
layout: post.njk
---

# Becoming a Better Programmer

Source: Becoming a Better Programmer: A Handbook for People Who Care About Code by Pete Goodliffe

## Bugs

### Bug Hunting

Difficult factors:

- how reproducible it is
- time between the cause of the bug entering the code and it actually being noticed

Methodically investigate and characterize the bug:

- Reduce it to the simplest set of reproduction steps possible.
- Ensure you are focusing on a single problem.
- Determine how repeatable the problem is:
- How frequently do your reproduction steps demonstrate the problem?
- Is it reliant on a simple series of actions?
- Does it depend on software configuration or the type of machine you’re running on?
- Do peripheral devices attached make any difference?

### Debugging Strategies

1. Lay Traps

- Find places in the code path between the point when the system seems correct and the point where its state is invalid, and set traps to catch the fault.
- Add assertions or tests to verify the facts that must hold for the state to be correct. Add diagnostic printouts to see the state of the code so you can work out what’s going on.

2. Binary Chop

- Work out the start and the end of a chain of events.
- Partition the problem space into two, and work out if the middle point is good or bad.
- Repeat this a few times, and until you’ve honed in on the problem.

3. Software archaeology

- Determine a point in the near past of the codebase when this bug didn’t exist
- Step forward in time to determine which code change‐set caused the breakage

4. Test, Test, Test

- If your test suite does not exercise it, then you can’t believe it works
- Write a test harness to demonstrate the problem, and use this harness to prove that you’ve fixed it

### Oblique Strategies

1. Take a break
2. Explain it to someone else

Consider if there are other related problems lurking in that section of code.
Keep notes on which parts of the code harbour more faults. Devote time to those problem areas.

### Non-Reproducible Bugs

- Keep records of the factors that contribute to the fault to discover any patterns that may identify the common causes.
- Consider adding more logging and assertions
- Threaded code, network interaction, storage speed, memory corruption, global variables/singletons

## Testing

### Types of Tests

- Unit tests specifically exercise the smallest “units” of functionality in isolation, to ensure that they each function correctly.
- Integration tests inspect how individual units glue together and interoperate correctly.
- End-to-end tests run against the fully integrated software stack, and can be used as acceptance criteria for the project.

### TDD cycle

1. Determine the next piece of functionality you need. Write a test for your new functionality.
2. Implement that functionality, in the simplest way possible. You know that your functionally is in place when the test passes. As you code, you may run the test suite many times; these tests should run rapidly (each step adds a small new part of functionality, and therefore a small test).
3. Tidy up the code. Refactor unpleasant commonality. Restructure the SUT (situation under test) to have a better internal structure.
4. Repeat until you have written passing test cases for all of the required functionality.

Inject the tests directly into the build process.

### Characteristics of a good test

- Short, clear name, so when it fails you can easily determine what the problem is
- Maintainable: easy to write, easy to read, easy to modify
- Runs quickly
- Up-to-date
- Runs without any prior machine configuration
- Does not depend on any other tests that have run before or after it; there is no reliance on external state, or on any shared variables in the code
- Tests the actual production code

Arrange: preparation
Act: perform an operation
Assert: validate the result of that operation

Aim for a single check—if you need to write multiple assertions then your test may not be performing
a single test case.

Ensure that your test suite covers the important functionality of your code.
Consider the “normal” input cases, common “failure cases”, what happens at boundary values, including empty or zero state.

Strong cohesion

Cohesion is a measure of how related functionality is gathered together and how well the parts inside a module work as a whole. Cohesion is the glue holding a module together.

Weakly cohesive modules are a sign of bad decomposition. Each module must have a clearly defined role, and not be a grab bag of unrelated functionality.

Loose coupling
Coupling is a measure of the interdependency between modules. In the simplest designs, modules have little coupling and so are less reliant on one another.

Modules interconnect in many ways (directly or indirectly). A module can call functions on other modules or be called by other modules. It may use web services or facilities published by another module. It may use another module’s data types or share some data (perhaps variables or files).

## Version Control

- central collaboration hub for developers to work together
- requires code to be stored in the system before integrating
- maintains a history of the work on a project; archives the exact contents for each specific release; catalogues who changed each file and why
- central backup
- allows for experiments; can roll back if they don’t work
- Provides rhythm for work flow:
  make a change, test that it builds against the head of the repository, test that it works, check it in
- enables multiple concurrent streams of development to occur on the same codebase without interference
- enables reversibility: any change in the history of the project can be identified and reversed if it is found to be wrong

Things to store
• All source code files
• All documentation
• All build files (makefiles, IDE setup, scripts)
• All configuration files
• All assets (graphics, sounds, install media, resource files)
• Any third-party–supplied files (e.g., code libraries you depend on, or DLLs from an outside company)

Things not to store
• Don’t store IDE configuration files or cache files.
• Don’t store generated artefacts
• Don’t store things that are not a part of your project
• Don’t check in test or bug reports.
• Don’t store project emails (add information to documentation).
• Don’t store personal settings
• Don’t keep things in the repository that you think you might need one day.

The directory structure should be clear and reveal the shape of the code. Include a helpful “read me” document at the top level.

Make small, atomic commits – little and often.

- Each commit must stand as an entire, individual step
- Don’t change code layout and functionality at the same time

Commit message

- brief summary of what has changed, ideally one clear sentence.
- reasons why you made the change, if these are of interest.
- If appropriate, include a bug reference number or other supporting information

Branches

- Encapsulating revisions of the source tree (e.g. each feature developed on its own branch)
- Exploratory development work
- Major changes that cut across a lot of the source tree and will take a while to complete, requiring many QA tests, and many individual check-ins to get right
- Individual bug fixes. Open a branch to work on a bug fix, test the work, and then merge the branch down once the fault has been closed.
- Separating volatile development from stable release lines.

Note: A feature toggle is a configuration file that selectively enables or disables functionality in your software. It might be a run-time-parsed XML config file, or a set of compile-time pre-processor flags.

http://martinfowler.com/bliki/TechnicalDebt.html

## Release Process Outline

1. Initiate the release
   Agree what the name and type of the release is

2. Prepare the release
   Determine exactly what code will constitute this release.
   Tag the code in source control to record what is going into the release. The tag name must reflect the release name.

3. Build the release
   Always build your software in a fresh checkout, from scratch. Never reuse old parts of a software build.
   Make your build as simple as a single step that automates all parts of the process. Use a scripting language to do this.

4. Package the release
   Construct a set of “release notes” describing how the release differs from the previous release: the new features and the bugs that have been fixed. (Customers can see this).
   Package the code (create an installer image, CD ISO images, etc.). This step should also be part of the automated build script

5. Deploy the release
   Store the generated artefacts and the build log for future reference. Put them on a shared file server.
   Test the release.
   Deploy the release.

New technology

- a new library
- an application framework
- a software tool
- how to use a new text editor or IDE
- a new documentation tool
- a test framework
- a new build system
- an issue tracking system
- a source control system

New technical skills

- how to effectively read alien code
- how to write technical documentation
- how to architect software

Challenges

- code katas (practice exercises)
- try solving a coding problem
- work on a personal project that will teach you something new
- try rewriting something on another platform or in another programming language

## Questions to reflect on

Do I strive to write the simplest code possible? Or do I type what comes to mind, and not think about commonality, refactoring, or code design?

Do you often copy code examples from books or websites into your work? How much effort do you invest in “sanitizing” the code for inclusion? Do you mercilessly update the layout, variable names, etc.? Do you add tests?

1. Version control systems come with GUI and command-line tools. What are the pros and cons for each? Is it important to know how to use both? Why?
2. What are the possible problems that distributed VCSs introduce over the simpler centralized model? How can you avoid these problems?
3. Are you using the right version control system? What facilities does your current system lack that you have seen in an alternative VCS?
4. Does using a version control system mean that you do not need to back up a personal development machine?
5. Which is a safer mechanism for concurrent working: feature-toggles or concurrent branches? Which involves the least management and integration overhead?
6. You are about to commit your changes to a repository and realize that you’ve worked on two separate things. Should you stop and rework the changeset, or just commit the code because you’ve done it already? Why? How do different VCS tools help this situation?
