# Word_Scramble
Word guessing game


## Table of Contents
Challenge users with scrambled (jumbled) words, and their task is to decode the letters to form a complete word. Pick levels of difficulty (Easy, Medium, Hard).
  - [Description](#project-description)
  - [Visuals](#visuals)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Support](#support)
  - [Contribution](#contribution)
  - [Authors & Acknowledgement](#authors-and-acknowledgment)
  - [License](#license)
  - [Project](#project-status)


# User Story
Our User Story - As a lover of word-related games, I want to play a word scramble game to challenge and expand my vocabulary skills and enhance cognitive skills like pattern recognition and problem-solving.

## Features

**Random Word Generation**: Each round presents a unique scrambled word.
    **Difficulty Levels**:
    Easy: 5 letter words.
    Medium: 6-7 letter words.
    Hard: 8+ letter words.
    **Timer**: Solve each word within a time limit. Time is subtracted within each difficulty level. 

## How to Play
Sign in username and pick challenge level.



# Foobar

Foobar is a Python library for dealing with word pluralization.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```
#
## Usage

# Support
Contact: Matt Mullenn (@MMullen4), Maggie Ellinwood (@mellinwood1023), Raven Hunter(@rhunter27), and Ruben Alston (@raabaja718) for any questions, concerns, or let us know how you're enjoying our game!



# Contributions
John Brown (Instructor), and Jonathan Pfluger (PA)
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change

# Authors & acknowledgement
Matt Mullenn (@MMullen4), Maggie Ellinwood (@mellinwood1023), Raven Hunter(@rhunter27), and Ruben Alston (@raabaja718) 

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Project


```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```