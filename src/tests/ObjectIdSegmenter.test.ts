import "../Extensions/ObjectIdExtensions";

import { ObjectId } from "bson";

import { ObjectIdSegmenter } from "../Segmenters/ObjectIdSegmenter";

test("ObjectIdSegmenter: tosegment with two", () => {
    const segmenter = new ObjectIdSegmenter();

    expect(segmenter.toSegment(new ObjectId("0".padStart(24, "0")), 2).index)
        .toBe(0);
    expect(new ObjectId("0".padStart(24, "0")).toSegment(2).index)
        .toBe(0);

    expect(segmenter.toSegment(new ObjectId("1".padStart(24, "0")), 2).index)
        .toBe(1);
    expect(new ObjectId("1".padStart(24, "0")).toSegment(2).index)
        .toBe(1);

    expect(segmenter.toSegment(new ObjectId("2".padStart(24, "0")), 2).index)
        .toBe(0);
    expect(new ObjectId("2".padStart(24, "0")).toSegment(2).index)
        .toBe(0);

    expect(segmenter.toSegment(new ObjectId("b".padStart(24, "0")), 2).index)
        .toBe(1);
    expect(new ObjectId("b".padStart(24, "0")).toSegment(2).index)
        .toBe(1);

    // throws
    expect(() => segmenter.toSegment(new ObjectId("g".padStart(24, "0")), 2))
        .toThrow(Error);
    expect(() => new ObjectId("g".padStart(24, "0")).toSegment(2))
        .toThrow(Error);
});

test("ObjectIdSegmenter: tosegment with zero", () => {
    const segmenter = new ObjectIdSegmenter();

    expect(segmenter.toSegment(new ObjectId("1".padStart(24, "0")), 0).index)
        .toBe(0);
    expect(new ObjectId("1".padStart(24, "0")).toSegment(0).index)
        .toBe(0);

    expect(segmenter.toSegment(new ObjectId("2".padStart(24, "0")), 0).index)
        .toBe(0);
    expect(new ObjectId("2".padStart(24, "0")).toSegment(0).index)
        .toBe(0);

    expect(segmenter.toSegment(new ObjectId("b".padStart(24, "0")), 0).index)
        .toBe(0);
    expect(new ObjectId("b".padStart(24, "0")).toSegment(0).index)
        .toBe(0);

    // throws
    expect(() => segmenter.toSegment(new ObjectId("g".padStart(24, "0")), 0))
        .toThrow(Error);
    expect(() => new ObjectId("g".padStart(24, "0")).toSegment(0))
        .toThrow(Error);
});

test("ObjectIdSegmenter: tosegment with prime", () => {
    const segmenter = new ObjectIdSegmenter();

    expect(segmenter.toSegment(new ObjectId("c".padStart(24, "0")), 13).index)
        .toBe(12);
    expect(new ObjectId("c".padStart(24, "0")).toSegment(13).index)
        .toBe(12);

    expect(segmenter.toSegment(new ObjectId("d".padStart(24, "0")), 13).index)
        .toBe(0);
    expect(new ObjectId("d".padStart(24, "0")).toSegment(13).index)
        .toBe(0);

    // throws
    expect(() => segmenter.toSegment(new ObjectId("g".padStart(24, "0")), 13))
        .toThrow(Error);
    expect(() => new ObjectId("g".padStart(24, "0")).toSegment(13))
        .toThrow(Error);
});

test("ObjectIdSegmenter: tosegment throw bad values", () => {
    const segmenter = new ObjectIdSegmenter();

    // throws
    expect(() => segmenter.toSegment(null, 2))
        .toThrow(Error);
    expect(() => segmenter.toSegment(undefined, 2))
        .toThrow(Error);

    expect(() => segmenter.toSegment(new ObjectId("0".padStart(24, "0")), null))
        .toThrow(Error);
    expect(() => new ObjectId("0".padStart(24, "0")).toSegment(null))
        .toThrow(Error);

    expect(() => segmenter.toSegment(new ObjectId("0".padStart(24, "0")), undefined))
        .toThrow(Error);
    expect(() => new ObjectId("0".padStart(24, "0")).toSegment(undefined))
        .toThrow(Error);
});

test("ObjectIdSegmenter: segment by single array", () => {
    const segmenter = new ObjectIdSegmenter();

    expect(segmenter.segment(new ObjectId("0".padStart(24, "0")), "AB".split("")))
        .toBe("A");
    expect(new ObjectId("0".padStart(24, "0")).segment("AB".split("")))
        .toBe("A");

    expect(segmenter.segment(new ObjectId("1".padStart(24, "0")), "AB".split("")))
        .toBe("B");
    expect(new ObjectId("1".padStart(24, "0")).segment("AB".split("")))
        .toBe("B");

    expect(segmenter.segment(new ObjectId("2".padStart(24, "0")), "AB".split("")))
        .toBe("A");
    expect(new ObjectId("2".padStart(24, "0")).segment("AB".split("")))
        .toBe("A");

    expect(segmenter.segment(new ObjectId("d".padStart(24, "0")), "AB".split("")))
        .toBe("B");
    expect(new ObjectId("d".padStart(24, "0")).segment("AB".split("")))
        .toBe("B");

    // throws
    expect(() => segmenter.segment(new ObjectId("2".padStart(24, "0")), "".split("")))
        .toThrow(Error);
    expect(() => new ObjectId("2".padStart(24, "0")).segment("".split("")))
        .toThrow(Error);

    expect(() => segmenter.segment(new ObjectId("g".padStart(24, "0")), "".split("")))
        .toThrow(Error);
    expect(() => new ObjectId("g".padStart(24, "0")).segment("".split("")))
        .toThrow(Error);
});

test("ObjectIdSegmenter: segment by two arrays", () => {
    const segmenter = new ObjectIdSegmenter();

    expect(segmenter.segments(new ObjectId("0".padStart(24, "0")), "ABC".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["A", "W"]));
    expect(new ObjectId("0".padStart(24, "0")).segments("ABC".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["A", "W"]));

    expect(segmenter.segments(new ObjectId("1".padStart(24, "0")), "ABC".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["A", "X"]));
    expect(new ObjectId("1".padStart(24, "0")).segments("ABC".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["A", "X"]));

    expect(segmenter.segments(new ObjectId("4".padStart(24, "0")), "ABC".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "W"]));
    expect(new ObjectId("4".padStart(24, "0")).segments("ABC".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "W"]));

    // throws
    expect(() => segmenter.segments(new ObjectId("2".padStart(24, "0")), "ABC".split(""), "".split("")))
        .toThrow(Error);
    expect(() => new ObjectId("2".padStart(24, "0")).segments("ABC".split(""), "".split("")))
        .toThrow(Error);
});

test("ObjectIdSegmenter: segment by three arrays", () => {
    const segmenter = new ObjectIdSegmenter();

    expect(segmenter.segments(new ObjectId("b".padStart(24, "0")), "ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["A", "#", "Z"]));
    expect(new ObjectId("b".padStart(24, "0")).segments("ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["A", "#", "Z"]));

    expect(segmenter.segments(new ObjectId("14".padStart(24, "0")), "ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "!", "W"]));
    expect(new ObjectId("14".padStart(24, "0")).segments("ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "!", "W"]));

    expect(segmenter.segments(new ObjectId("19".padStart(24, "0")), "ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "@", "X"]));
    expect(new ObjectId("19".padStart(24, "0")).segments("ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "@", "X"]));

    expect(segmenter.segments(new ObjectId("3e6af000019".padStart(24, "0")), "ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "@", "X"]));
    expect(new ObjectId("3e6af000019".padStart(24, "0")).segments("ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "@", "X"]));

    // throws
    expect(() => segmenter.segments(new ObjectId("2".padStart(24, "0")), "ABC".split(""), "!@#$%".split(""), "".split("")))
        .toThrow(Error);
    expect(() => new ObjectId("2".padStart(24, "0")).segments("ABC".split(""), "!@#$%".split(""), "".split("")))
        .toThrow(Error);
});
