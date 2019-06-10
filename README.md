# Segmenter ObjectID

Segment utilities for ObjectID types. Conveniently bucket data based on an ObjectID hash. 

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

segmenter.segments(new ObjectID("xxxxxxxxxxxxxxxxxx6761ba"), ["A", "B"], ["X", "Y"]); // ["A", "X"]
segmenter.segments(new ObjectID("xxxxxxxxxxxxxxxxxx6761bb"), ["A", "B"], ["X", "Y"]); // ["A", "Y"]
segmenter.segments(new ObjectID("xxxxxxxxxxxxxxxxxx6761bc"), ["A", "B"], ["X", "Y"]); // ["B", "X"]

```

## Extension usage 

```javascript
new ObjectID("xxxxxxxxxxxxxxxxxx6761ba").segments(["A", "B"], ["X", "Y"]); // ["A", "X"]
new ObjectID("xxxxxxxxxxxxxxxxxx6761bb").segments(["A", "B"], ["X", "Y"]); // ["A", "Y"]
new ObjectID("xxxxxxxxxxxxxxxxxx6761bc").segments(["A", "B"], ["X", "Y"]); // ["B", "X"]

```

# Resolution

- This segmenter users the trailing 3-bytes of a hexadecimal ObjectID to determine bucket indexing. This specification is arbitrary to [MongoDB's implementation of ObjectIDs](https://docs.mongodb.com/manual/reference/method/ObjectId/) which describes this portion of the ObjectID as a ``` counter, starting with a random value```.
