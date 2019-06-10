"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const segmenter_1 = require("@~graphite/segmenter");
class ObjectIdSegmenter extends segmenter_1.TypeSegmenter {
    toSegment(value, segmentCount, segmentMultiplier) {
        if (!value || !bson_1.ObjectId.isValid(value)) {
            throw new Error(`Value null or invalid objectid.`);
        }
        const indexValue = parseInt(value.toString().slice(18, 24), 16);
        // piggy-back number-segmenter's implementation
        this.numberSegmenter = this.numberSegmenter || new segmenter_1.NumberSegmenter();
        return this.numberSegmenter.toSegment(indexValue, segmentCount, segmentMultiplier);
    }
}
exports.ObjectIdSegmenter = ObjectIdSegmenter;
//# sourceMappingURL=ObjectIdSegmenter.js.map