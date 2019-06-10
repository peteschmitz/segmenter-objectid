# Segmenter ObjectId

Segment utilities for ObjectId types. Conveniently bucket data based on an ObjectId hash. 

See: [segmenter](https://github.com/peteschmitz/segmenter)


# Installation

```
npm i @~graphite/segmenter-objectid
```

## Transient dependencies

- [@~graphite/segmenter](https://www.npmjs.com/package/@~graphite/segmenter)

- [bson](https://www.npmjs.com/package/bson)

# Examples

## Explicit usage 

```javascript
const segmenter = new ObjectIdSegmenter();

segmenter.segments(new ObjectId("xxxxxxxxxxxxxxxxxx000000"), ["A", "B"], ["X", "Y"]); // ["A", "X"]
segmenter.segments(new ObjectId("xxxxxxxxxxxxxxxxxx000001"), ["A", "B"], ["X", "Y"]); // ["A", "Y"]
segmenter.segments(new ObjectId("xxxxxxxxxxxxxxxxxx00000d"), ["A", "B"], ["X", "Y"]); // ["A", "Y"]
segmenter.segments(new ObjectId("xxxxxxxxxxxxxxxxxx00000e"), ["A", "B"], ["X", "Y"]); // ["B", "X"]

```

## Extension usage 

```javascript
new ObjectId("xxxxxxxxxxxxxxxxxx000000").segments(["A", "B"], ["X", "Y"]); // ["A", "X"]
new ObjectId("xxxxxxxxxxxxxxxxxx000001").segments(["A", "B"], ["X", "Y"]); // ["A", "Y"]
new ObjectId("xxxxxxxxxxxxxxxxxx00000d").segments(["A", "B"], ["X", "Y"]); // ["A", "Y"]
new ObjectId("xxxxxxxxxxxxxxxxxx00000e").segments(["A", "B"], ["X", "Y"]); // ["B", "X"]

```

# Resolution

- This segmenter users the trailing 3-bytes of a hexadecimal ObjectID to determine bucket indexing. This specification is arbitrary to [MongoDB's implementation of ObjectIDs](https://docs.mongodb.com/manual/reference/method/ObjectId/) which describes this portion of the ObjectID as a ``` counter, starting with a random value```.
