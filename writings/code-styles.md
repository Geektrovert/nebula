---
title: "How to style code blocks"
date: "2020-06-05"
og:
  description: "All about code"
  image: ""
author:
  name: "Samnan Rahee"
tags: "code,style,blog"
---

This is where we start:

```py
print("hello world!")

# this is a comment
def just_a_function():
  return "hello world"

just_a_function() #inline comment
```

Let's add some code:

```py:7-8
print("hello world!")

# this is a comment
def just_a_function():
  return "hello world"

def another_function():
    return "something else"

just_a_function() #inline comment
```

Let's update some code:

```py:!-8
print("hello world!")

# this is a comment
def just_a_function():
  return "hello world"

def another_function():
    return "updated version"

just_a_function() #inline comment
```

Let's remove the code highlighted in red:

```py:-3-5,-10
print("hello world!")

# this is a comment
def just_a_function():
  return "hello world"

def another_function():
    return "updated version"

just_a_function() #inline comment
```

This is the final code:

```py
print("hello world!")

def another_function():
    return "updated version"

```
