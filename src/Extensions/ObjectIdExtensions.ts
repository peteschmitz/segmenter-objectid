import { ObjectId } from "bson";

import { SegmentResult } from "@~graphite/segmenter";

import { ObjectIdSegmenter } from "../Index";

declare module "bson" {
    export interface ObjectId {
        segment<T>(array: T[]): T;
        segments<T>(...arrays: T[][]): T[];
        toSegment(segmentCount: number, segmentMultiplier?: number): SegmentResult;
    }
}

if (!ObjectId.prototype.segment) {
    ObjectId.prototype.segment = function(array) {
        return new ObjectIdSegmenter().segment(this, array);
    };
}

if (!ObjectId.prototype.segments) {
    ObjectId.prototype.segments = function(...arrays) {
        return new ObjectIdSegmenter().segments(this, ...arrays);
    };
}

if (!ObjectId.prototype.toSegment) {
    ObjectId.prototype.toSegment = function(segmentCount, segmentMultiplier) {
        return new ObjectIdSegmenter().toSegment(this, segmentCount, segmentMultiplier);
    };
}

export { };
