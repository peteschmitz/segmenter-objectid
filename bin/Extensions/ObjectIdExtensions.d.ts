import { SegmentResult } from "@~graphite/segmenter";
declare module "bson" {
    interface ObjectId {
        segment<T>(array: T[]): T;
        segments<T>(...arrays: T[][]): T[];
        toSegment(segmentCount: number, segmentMultiplier?: number): SegmentResult;
    }
}
export {};
