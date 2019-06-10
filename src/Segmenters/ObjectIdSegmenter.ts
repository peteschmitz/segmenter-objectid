import { ObjectId } from "bson";

import { NumberSegmenter, SegmentResult, TypeSegmenter } from "@~graphite/segmenter";

export class ObjectIdSegmenter extends TypeSegmenter<ObjectId> {
    private numberSegmenter: NumberSegmenter;

    public toSegment(value: ObjectId, segmentCount: number, segmentMultiplier?: number): SegmentResult {
        if (!value || !ObjectId.isValid(value)) {
            throw new Error(`Value null or invalid objectid.`);
        }

        const indexValue = parseInt(value.toString().slice(18, 24), 16);

        // piggy-back number-segmenter's implementation
        this.numberSegmenter = this.numberSegmenter || new NumberSegmenter();
        return this.numberSegmenter.toSegment(indexValue, segmentCount, segmentMultiplier);
    }
}
