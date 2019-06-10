import { ObjectId } from "bson";
import { SegmentResult, TypeSegmenter } from "@~graphite/segmenter";
export declare class ObjectIdSegmenter extends TypeSegmenter<ObjectId> {
    private numberSegmenter;
    toSegment(value: ObjectId, segmentCount: number, segmentMultiplier?: number): SegmentResult;
}
