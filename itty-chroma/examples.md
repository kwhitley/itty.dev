# Examples

## Basic Styling

### Simple Colors
```ts
import { chroma } from 'itty-chroma'

chroma.red.log('Error message')
chroma.green.log('Success message')
chroma.blue.log('Info message')
chroma.yellow.log('Warning message')
```

### Text Formatting
```ts
chroma.bold.log('Bold text')
chroma.italic.log('Italic text')
chroma.underline.log('Underlined text')
chroma.strike.log('Strikethrough text')
```

## Advanced Styling

### Custom Colors
```ts
chroma.color('hotpink').log('Hot pink text')
chroma.color('#ff6b6b').log('Hex color text')
chroma.color('rgb(75, 192, 192)').log('RGB color text')
```

### Background and Layout
```ts
chroma.red.bg('yellow').log('Red text on yellow background')
chroma.blue.padding('10px').log('Text with padding')
chroma.green.border('2px solid red').log('Text with border')
chroma.purple.radius('5px').bg('lightgray').log('Rounded background')
```

## Complex Compositions

### Multi-Style Messages
```ts
chroma.log(
  'Status: ',
  chroma.green.bold,
  'SUCCESS',
  ' - Operation completed in ',
  chroma.blue.italic,
  '250ms'
)
```

### Card-like Styling
```ts
chroma
  .bg('linear-gradient(45deg, #ff6b6b, #4ecdc4)')
  .color('white')
  .padding('15px')
  .radius('8px')
  .bold
  .log('Gradient Card')
```

## Practical Use Cases

### Debug Logging
```ts
const debug = chroma.cyan.italic
const error = chroma.red.bold
const success = chroma.green.bold

debug.log('Debug: Processing user data...')
success.log('Success: User created successfully')
error.log('Error: Validation failed')
```

### API Response Logging
```ts
function logApiResponse(status: number, data: any) {
  if (status >= 200 && status < 300) {
    chroma.green.bold.log(`✓ ${status}:`, data)
  } else if (status >= 400) {
    chroma.red.bold.log(`✗ ${status}:`, data)
  } else {
    chroma.yellow.log(`⚠ ${status}:`, data)
  }
}
```

### Development Environment Indicators
```ts
const env = process.env.NODE_ENV

if (env === 'development') {
  chroma.yellow.bg('black').padding('5px').log('🚧 DEVELOPMENT MODE')
} else if (env === 'staging') {
  chroma.orange.bg('black').padding('5px').log('🔧 STAGING MODE')
} else {
  chroma.green.bg('black').padding('5px').log('🚀 PRODUCTION MODE')
}
```

## Browser Console Snippets

### Performance Monitoring
```ts
const perfStart = chroma.blue.bold
const perfEnd = chroma.green.bold

perfStart.log('🏁 Starting operation...')
// ... your code ...
perfEnd.log('✅ Operation completed in 125ms')
```

### Error Boundaries
```ts
const errorBoundary = chroma.red.bg('lightyellow').padding('10px').border('1px solid red')

try {
  // risky operation
} catch (error) {
  errorBoundary.error('💥 Error caught:', error.message)
}
```

### Feature Flags
```ts
const featureEnabled = true

if (featureEnabled) {
  chroma.green.bg('lightgreen').padding('5px').log('🎉 New feature enabled!')
} else {
  chroma.gray.log('💤 Feature disabled')
}
```