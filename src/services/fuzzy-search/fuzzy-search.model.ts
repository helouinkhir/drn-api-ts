import { Category } from "../ai/ai.service.model";
import { WordModel } from "../ai/vision/vision.model";

export interface RankedWordModel extends WordModel {
    rank: number;
}

export interface Mapping {
    sequence: RankedWordModel[];
    category: Category;
    matchText: string;
}