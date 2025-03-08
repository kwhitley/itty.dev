# itty-chroma

[![Version](https://img.shields.io/npm/v/itty-chroma.svg?style=flat-square)](https://npmjs.com/package/itty-chroma)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-chroma&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-chroma)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-chroma?style=flat-square)](https://coveralls.io/github/kwhitley/itty-chroma)
[![Issues](https://img.shields.io/github/issues/kwhitley/itty-chroma?style=flat-square)](https://coveralls.io/github/kwhitley/itty-chroma)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

Powerful styling for the browser console in under 500 bytes.
<!--![image](https://github.com/user-attachments/assets/1ac23229-111c-4434-a6ce-379b55d71a71)-->

## Example
```ts
import { chroma } from 'itty-chroma'

// keep it simple
chroma.red.log('This will be red.')

// or play a little
chroma.log(
  chroma.green,                // set the color to green
  'This is all',
  'green.',
  chroma.blue.underline.bold,  // now switch to blue
  'Now this is blue.',
)
```
![image](https://github.com/user-attachments/assets/7f84014b-97e1-474f-8020-3430efd3e0c6)

## Features

- Made specifically for the browser console.
- Loads of styling options, with infinite combinations.
- Simple and powerful API, designed for ease & readability.
- Tiny. It's an itty library, after all.

## How it Works

Chroma is an infinite proxy object/function chain... *thingy*... that assembles styles before sending them to `console.log`.

This sounds very confusing... which is understandable, because it was confusing to write as well.

Here are the basic rules:

### 1. Use `chroma.log` (also supports `warn` and `error`) to enable styling
```ts
chroma.log('text') // console.log('text')
chroma.warn('text') // console.warn('text')
chroma.error('text') // console.error('text')
```
![image](https://github.com/user-attachments/assets/0c82f3e9-0fae-4e4a-a021-6d334874ed00)


### 2. Add styles by chaining style properties
```ts
// call a segment directly, using .log
chroma.bold.red.log('This will be red.')
```
![image](https://github.com/user-attachments/assets/63a78004-87f2-4bf2-ba9e-60407b986419)

### 3. Or compose using chroma segments
```ts
chroma.log(
  chroma.bold.green, 
  'This will be green.'
)
```
![image](https://github.com/user-attachments/assets/04a68ebd-3c46-45cc-ad71-9ed8e68b98fc)

These can be saved for re-use:
```ts
const blue = chroma.bold.blue

chroma.log(
  blue,
  'This will be blue.'
)
```
![image](https://github.com/user-attachments/assets/d1083073-f33d-4356-8b21-37ae02fe0d3c)

They can also be saved with the `.log` as a custom logger:
```ts
const ittyLogger = chroma.bold.color("#f0c").log

ittyLogger('This will be itty-colored.')
```
![image](https://github.com/user-attachments/assets/0a2e05aa-923c-4d47-98b8-bf3f583a3cf4)

### 4. Any valid CSS color name works (100% support)
```ts
chroma.salmon.log('This is salmon.')
chroma.cornflowerblue.log('This is cornflowerblue.')
chroma.cornFlowerBlue.log('Case does not matter here...')
```
![image](https://github.com/user-attachments/assets/b363fcec-a289-4f25-af8c-d3d5f31e532f)

### 5. All valid CSS works within properties that expect a value
```ts
chroma
  .color('rgba(255,0,100,0.4)')
  .log('This works just fine')
```
![image](https://github.com/user-attachments/assets/98f978a0-87b6-4488-8f22-696452e927d0)

### 6. ...or use your own custom CSS with `.style(css: string)`
```ts
chroma
  .size('2em')
  .padding('0.5em')
  .style('text-transform:uppercase; text-shadow:0 0 0.5em magenta;')
  .log('So does this')
```
![image](https://github.com/user-attachments/assets/3a6e5bcf-99ab-4616-9794-579c2e0e6cc8)

### 7. A style will continue until replaced, or cleared using **`chroma.none`**
```ts
chroma.log(
  chroma.red('this will be red'),
  '...but so will this',
  chroma.none,
  'back to unformatted text'
)
```
![image](https://github.com/user-attachments/assets/d970e8c1-1249-4a39-a183-845ccd5d841f)

### 8. Example: Creating custom log functions
```ts
// we define a curried function to accept some args now, some later
const createLogger = (type = 'log', label, badge = 'grey', text = 'grey') => 
  (...args) => 
    chroma[type](
      chroma.bg(badge).white.bold.padding('2px 5px 1px').radius('0.2rem')(label),
      chroma.color(text).italic,
      ...args,
    )

// our loggers are partial executions
const info = createLogger('log', 'INFO', 'green')
const warning = createLogger('warn', 'WARNING', 'orange', 'brown')

// and we finally call them to log messages
info('This is just a helpful bit of info!')
warning('But this is a more serious warning text...')
```
![image](https://github.com/user-attachments/assets/58cdbcbb-51c3-4b67-8fe8-323bf3a094cd)

## Play With It!

For your convenience, `chroma` is available within [itty.dev](https://itty.dev) on the global `window` object.  This means you can play with it here, before you install it in your project!

1. Open the browser console/DevTools.
2. Type `chroma.magenta.log('hello')`
3. See the result!

<br />

## API / Supported Properties

| PROPERTY | DESCRIPTION | EXAMPLE(s) |
| --- | --- | --- |
| **.log** | once executed, will output to console.log | `chroma.log('hello')` |
| **.warn** | once executed, will output to console.warn | `chroma.warn('warning text')` |
| **.error** | once executed, will output to console.error | `chroma.error('error text')` |
| **.bold** | bold text | `chroma.bold('this is bold')`, `chroma.bold.red('this is bold and red')` |
| **.italic** | italicized text | `chroma.italic('this is italic')` |
| **.underline** | underlined text | `chroma.underline('text')` |
| **.strike** | text with a line through it | `chroma.strike('this text was removed')` |
| **.{colorName}** | sets text color, supports any valid CSS color name | `chroma.magenta`, `chroma.lightGreen` |
| **.color(value)** | sets font color, supports any valid CSS color | `chroma.color('white')`, `chroma.color('rgba(255,0,0,0.2)')` |
| **.font(value)** | sets font, supports any valid CSS font-family | `chroma.font('Georgia')` |
| **.size(value)** | sets font size | `chroma.size('0.8rem')` |
| **.bg(value)** | sets background, supports any valid CSS background | `chroma.bg('salmon')` |
| **.radius(value)** | sets border-radius (for badges) | `chroma.radius('4px')` |
| **.border(value)** | sets border style | `chroma.border('double 5px red')` |
| **.padding(value)** | sets padding | `chroma.padding('2px 5px')` |
| **.style(value)** | sets custom CSS, allowing any valid sequence | `chroma.style('text-transform:uppercase;text-shadow:0 0 0.5rem rgba(255,0,100,0.5)')` |
| **.none**<sup>1</sup> | clears styling for subsequent arguments | `chroma.red('red text', chroma.none, 'plain text')` |

<sup>1</sup> <small>Any invalid CSS color name can be used in place of **chroma.none**, as this utimately turns into `"color:none;"`. Alternatively, you could use **chroma.clear**, **chroma.noStyle**, or anything else.</small>


