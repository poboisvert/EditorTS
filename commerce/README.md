# ES6 - javascript

Variable can change type in Javascript.

## Primitive types

- Number, String, Boolean, Null, Undefined

### Quick Sheets

=> (-1)/0 = -Infinity
=> NaN + 5 = NaN
=> (10 % 6) \*\* 2 = 16
=> 200 + 0/0 = NaN

Chrome Console clear all messages:

> clear()

## Variables

Case 1:

let eggCount = 42
eggCont + 2

ANS: 42, eggCount does not change

Case 2:
const rating = 7.5
rating = 8

ANS: 7.5, it's a const

## Quotes

It doesn't matter whice one, but be consistent.

Eg: "I was saying 'test'." or 'I was saying "test".'

## Strings

Eg: the word: "chicken" then c = 0, h = 1, i = 3, etc

> "hello".length = 5
> "hello ".length = 6

---

let mySong = "Surfin' USA"
mySong.length = 11
mySong[0] = S

---

mySong[0] = "D"
print(mySong) => "Surfin' USA" will not change

---

### Strings Methods

Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

> thing.method() - built in

---

> let msg = "test"

> msg = msg.toUpperCase()

> msg = "TEST"

---

> let color = " purple "

> color.trim()

> print(color) = "purple.

> color.trim().toUpperCase() = "PURPLE"

---

Quick functions

> .slice(0,4) // To slice(cut) OR .slice(4) // To the end
> .replace ("FROM", "TO")

### Null & Undefined

Null => (1) Intentional absence of any value and (2) must be assigned.
Undefined => (1) Do not have an assigned value

### Math Object

> const step1 = Math.random()

## Controlling Program Logic and Flow

### "==" vs "==="

"==" Check for equality, but do not validate the type

eg: 0 == "" is True
