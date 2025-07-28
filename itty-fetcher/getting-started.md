# Getting Started

### Option 1: Import
```ts
import { fetcher } from 'itty-fetcher' // ~650 bytes
```

### Option 2: Just copy this snippet:
<!-- BEGIN SNIPPET -->
```ts
let fetcher=(e,t)=>{let s="string"==typeof e?{base:e,...t}:e||{};return new Proxy(()=>{},{get:(e,t)=>(...e)=>(async(e,t,s,r=("string"==typeof s[0]?s.shift():""),a=("GET"!=e?s.shift():null),n={...t,...s.shift(),method:e},o=new Headers(t.headers),i="string"==typeof a,f=t.base??"")=>{r=new URL((r.includes("://")?r:(f.includes?.("://")?f:globalThis.location?.href+"/"+f)+(r?"/"+r:"")).replace(/\/+/g,"/"));for(let e in n.query||{})r.searchParams.append(e,n.query[e]);n.body=a,a&&0!=n.encode&&(n.body=i?a:JSON.stringify(a),i||o.set("content-type","application/json"));for(let[e,t]of new Headers(n.headers||[]))o.set(e,t);let p=await(n.fetch||fetch)(new Request(r,{...n,headers:o})),c=p.ok?void 0:Object.assign(new Error(p.statusText),{status:p.status,response:p});if(n.parse??"json")try{p=await p[n.parse??"json"](),c&&"json"==(n.parse??"json")&&(c={...c,...p})}catch(e){c||(c=Object.assign(new Error(e.message),{status:p.status,response:p}))}for(let e of n.after||[])p=await e(p)??p;if(n.array)return[c,c?void 0:p];if(c)throw c;return p})(t.toUpperCase(),s,e)})};
```
<!-- END SNIPPET -->
_Note: This will lose TypeScript support, but is great for adding to your browser console (via script extensions, etc)._

<br />

## Examples

### A one-line fetch
```ts
const items = await fetcher().get('https://example.com/api/items')

// or typed...
const items = await fetcher<MyCustomType[]>()
  .get('https://example.com/api/items')
```

### A reusable API endpoint
```ts
const api = fetcher('https://example.com', {  // set a base url
  headers: { 'x-api-key': 'my-secret-key' },  // add a header to all requests
  after: [console.log],                       // and some response handlers/transforms
})

// to make api calls even sexier
const items = await api.get('/items')

// no need to encode/decode for JSON payloads
api.post('/items', { foo: 'bar' })
```