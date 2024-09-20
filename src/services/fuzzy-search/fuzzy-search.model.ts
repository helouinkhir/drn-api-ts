import { WordModel } from "../ai/vision/vision.model";

export interface RankedWordModel extends WordModel {
    rank: number;
}

export interface Mapping {
    sequence: RankedWordModel[];
    matchText: string;
}

export interface FuzzyMatchModel {
    mapped: WordModel[];
    notMapped: RankedWordModel[];
}

export interface NumberMatchModel {
    mapping: WordModel[];
    notNumbers: WordModel[];
}