"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const Index_1 = require("../Index");
if (!bson_1.ObjectId.prototype.segment) {
    bson_1.ObjectId.prototype.segment = function (array) {
        return new Index_1.ObjectIdSegmenter().segment(this, array);
    };
}
if (!bson_1.ObjectId.prototype.segments) {
    bson_1.ObjectId.prototype.segments = function (...arrays) {
        return new Index_1.ObjectIdSegmenter().segments(this, ...arrays);
    };
}
if (!bson_1.ObjectId.prototype.toSegment) {
    bson_1.ObjectId.prototype.toSegment = function (segmentCount, segmentMultiplier) {
        return new Index_1.ObjectIdSegmenter().toSegment(this, segmentCount, segmentMultiplier);
    };
}
//# sourceMappingURL=ObjectIdExtensions.js.map