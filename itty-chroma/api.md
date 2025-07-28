# API Reference

## Core Function

### `chroma`

The main styling proxy that provides chainable methods for console styling.

```ts
import { chroma } from 'itty-chroma'
```

## Color Methods

### Basic Colors
- `chroma.red` - Red text
- `chroma.green` - Green text  
- `chroma.blue` - Blue text
- `chroma.yellow` - Yellow text
- `chroma.orange` - Orange text
- `chroma.purple` - Purple text
- `chroma.pink` - Pink text
- `chroma.cyan` - Cyan text

### Custom Colors
```ts
chroma.color('hotpink')     // Any CSS color name
chroma.color('#ff6b6b')     // Hex colors
chroma.color('rgb(255,0,0)') // RGB values
```

## Style Methods

### Text Styling
- `chroma.bold` - Bold text
- `chroma.italic` - Italic text
- `chroma.underline` - Underlined text
- `chroma.strike` - Strikethrough text

### Background and Layout
- `chroma.bg('color')` - Background color
- `chroma.padding('10px')` - Padding
- `chroma.border('1px solid red')` - Border
- `chroma.radius('5px')` - Border radius

### Typography
- `chroma.font('Arial')` - Font family
- `chroma.size('16px')` - Font size

## Output Methods

### Logging
- `chroma.log()` - Console.log output
- `chroma.warn()` - Console.warn output
- `chroma.error()` - Console.error output

### Style Building
```ts
// Get style array for manual use
const styleArray = chroma.red.bold.style()
console.log('%cHello', ...styleArray)
```

## Chaining

All methods are chainable:

```ts
chroma.red.bold.bg('yellow').padding('5px').log('Styled text')
```

## Examples

```ts
// Basic styling
chroma.red.log('Error message')
chroma.green.bold.log('Success!')

// Complex styling
chroma.blue.bg('lightgray').padding('10px').radius('5px').log('Card-like styling')

// Multiple arguments
chroma.log('Normal text', chroma.red.bold, 'Bold red text', chroma.blue, 'Blue text')

// Reusable styles
const errorStyle = chroma.red.bold.bg('lightyellow').padding('5px')
errorStyle.log('Error 1')
errorStyle.log('Error 2')
```