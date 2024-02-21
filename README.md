`README updated Feb. 20, 2024`
# Introduction
We are Group 3, working on Productivity Site.

Our website aims to be useful for those who need additional help keeping themselves organized and on track. 

With online classes becoming increasingly common since the pandemic, more and more students are struggling to keep themselves organized; however, this site is _not_ only aimed toward students. Even those already well-experienced in their career can fall behind or regularly struggle to keep up with their workload. 
Our web app seeks to aid those wishing to be productive in a user-friendly fashion.

# Productivity Site GitHub
Group 3's Project repository makes cooperation easier, speeding up our development process.

## Repository Structure
The `main` branch will hold our completed app. 
`develop` is for the developmental builds of our app.

Any other branch is a build being actively developed and will be merged with `develop` upon completion.

## Data Structure
### localStorage for Website Thematics
We have created a custom handler object to manage user theme preferences.
The reason for needing a custom class is primarily for ease of use and speed benefits.

The way it works is via the CSS `:root` element selector.
We define variables (see Types of Visibility) in the root element on higher cascading levels, which are overridden by user preferences if they exist.
Directly overriding CSS variables allows fine-tuned control over the styling of the web page.

When developing the handler we wanted to focus on being able to easily manage and create groups of player preferences, even if you want to group properties which will affect different pages.

Additionally, speed was intended to be optimized behind the current design.
This is because our handler groups preferences together which are likely to be modified at the same time, reducing the amount of `setItem` and `getItem` calls per applied modification.

When a user modifies their preferences, they are saved to the current `localStorage` instance.
This allows a user to have complete freedom over the look of the webpage, while being able to simply close the browser and come back to their modified layout at a later time.

### The UserPrefObj Handler (UPO)
The crux of our handling system is the UserPrefObj object.
It's purpose is to group together variables which are likely to be modified at the same time with a given ID.

This object also provides methods to retrieve and set the data of variable members.

Refer to the JSDocs for help if you need it

Example creation of a UPO to handle a `:root` element on the `timers` page:
```JS
  const UPO = new UserPrefObj("example", {
   timers: [
       "variable1",
       "variable2",
        ...
   ]
  });
```

Now, pushing user preferences is as easy as calling `UPO.PushRulesToLS()` with all of the rules we wish to push. `Rule` in this context refers to a CSS rule:
```CSS
property: value;
```

A UPO can parse rules so long as the property you are trying to override is a member of the UPO.

Example pushing a set of rules for UPO to parse:
```JS
  UPO.PushRulesToLS(
    ["variable1", "#000000"],
    ["variable2", "2"],
    ["variable3", "100%"]
  );
```

After doing this, the UPO will override all properties which are a member of itself with the provided values. 

To load the data of UPO members (for preloading), call `UPO.LoadData()`. This is done automatically when you call `UPO.PushRulesToLS()`.

To delete all user preferences stored by a UPO, call `UPO.DeleteData()`.

### Types of Visibility
`Visibility` refers to the ability of a user to override a `:root` element variable.

In this context, a `user` is any entity that interacts with `localStorage` through our handler.

#### Fully Visible
A `Fully Visible` variable is one that a user has complete freedom to override.

A variable is Fully Visible to the `end-user` if it is a member of at least one UPO instance.
(Side note: Making a single variable to be a member of multiple UPO instances is usually a bad idea.
            The framework should allow it to work fine, but it is useless redundancy in most cases)

A variable is Fully Visible to a `UPO` if that variable is a member of said UPO.

#### Invisible
An `Invisible` variable is one that a user cannot write to. Invisible variables are primarily used for
calculation purposes. Effectively, an Invisible variable is just a normal CSS variable.

A variable is Invisible to the `end-user` if it is not a member of any UPO instance.

A variable is Invisible to a `UPO` if that variable is not a member of said UPO.

## Group Structure
Group 3 is comprised of 4 members who individually contribute to the project. All of us have prior experience with web development, which brought us to the conclusion that GitHub would make the process more friendly toward cooperation.

## Our Members
### Chris
CHRIS YOU CAN WRITE HERE IF YOU WANT

### Azavier (Certified Webmaster)
I'm Azavier! In the past I have enjoyed making my own web projects using various JavaScript libraries such as p5.js

I am certified in several programming languages as well as the web development trifecta. Having successfully completed the CIW course, I _happily_ call myself a webmaster.
>_The Big Apple is small when you're far away._ - Just made this up

### Sarah
SARAH YOU CAN WRITE HERE IF YOU WANT

### Ethan
ETHAN YOU CAN WRITE HERE IF YOU WANT
