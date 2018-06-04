# Ribs
Template Generator for Stateless React Components

### DO NOT USE IN PRODUCTION YET!

## Is that true?
Yep, it is, you just need to write one simple file and Done!


## How to use?
Firs intall it!
`$ sudo npm install -g ribs-lang`

then you're ready to use it,

Now you can write your first `.rib` file

> example.rib

```
<-- @include "./Component.jsx" as Component -->

<Component>
  <-- for item in list -->	
    <input/>
  <-- end for -->
</Component>
```

since you have done it, just translate :)

`$ ribs example.rib example.jsx`

and done :tada: your file will be converted to a `.jsx` file

## Functions
### Import
Usage: `<-- @include "<file>" as <ComponentName> -->`  
*__Important:__* Do not use the word __Component__ as the name for a imported component, it's a reserved word!

### For statement
Usage: `<-- for <iterator> in <Array|Range> -->`  
You can use a property or a `range()` function for this statement  
e.g. `<-- for <iterator> in range(10) -->` <-- it uses the range  
e.g. `<-- for <iterator> in prop -->` <-- it uses the prop `this.props.prop`  

### Get Statement
Usage: `<-- get <prop> -->`
it render the prop into the file



### Roadmap
- [x] Add support for import
- [x] Add support for FOR-STATEMENT
- [x] Add support for get props
- [ ] Add support for IF-Statement