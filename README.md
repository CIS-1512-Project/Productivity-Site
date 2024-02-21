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

Any other branch is a build being actively developed and will be merged with `develop` UTPn completion.

## Data Structure
### localStorage for Website Thematics
We have created a custom handler object to manage user theme preferences.
The reason for needing a custom class is primarily for ease of use and speed benefits.

The way it works is via the CSS `:root` element selector.
We define variables in the root element on higher cascading levels, which are overridden by user preferences if they exist.
Directly overriding CSS variables allows fine-tuned control over the styling of the web page.

When developing the handler we wanted to focus on being able to easily manage and create groups of player preferences, even if you want to group properties which will affect different pages.

Additionally, speed was intended to be optimized behind the current design.
This is because our handler groups preferences together which are likely to be modified at the same time, reducing the amount of `setItem` and `getItem` calls per applied modification.

When a user modifies their preferences, they are saved to the current `localStorage` instance.
This allows a user to have complete freedom over the look of the webpage, while being able to simply close the browser and come back to their modified layout at a later time.

#### The UserThemePrefs Handler (UTP)
The crux of our theme handling system is the UserThemePrefs object.
It's purpose is to group together variables which are likely to be modified at the same time with a given ID.

This object also provides methods to retrieve and set the data of variable members.

Refer to the JSDocs for help if you need it (Azavier put a lot of effort into it).

##### Types of Visibility
`Visibility` refers to the ability of a user to override a `:root` element variable with a UserThemePrefs instance.

###### Visible
A `Visible` variable is one that a user has complete freedom to override. Visible variables are primarily used to specify values used for either directly displaying to the scren or other calculation with Invisible variables.

A variable is Visible to a user if it is a member of at least one UTP instance.
(Side note: Making a single variable to be a member of multiple UTP instances is usually a bad idea.
            The framework should allow it to work fine, but it is useless redundancy in most cases)

###### Invisible
An `Invisible` variable is one that a user cannot write to. Invisible variables are primarily used for
calculation purposes. 
Effectively, an Invisible variable is just a normal CSS variable.

A variable is Invisible to a user if it is not a member of any UTP instance.

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
