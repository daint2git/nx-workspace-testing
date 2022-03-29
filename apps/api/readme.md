# api

## graphql

```graphql
query allSets {
  allSets {
    id
    name
    year
    numParts
  }
}

mutation addSet {
  addSet(name: "My New Set", year: "2020", numParts: 200) {
    id
  }
}
```
