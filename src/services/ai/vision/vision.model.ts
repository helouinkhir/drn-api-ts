import { google } from "@google-cloud/vision/build/protos/protos";

export type ImageDetectionData = {
  text: TextData;
  colors: (google.cloud.vision.v1.IColorInfo & Record<"name", string>)[];
};

export interface WordModel  {
  word: string;
  confidence: number;
  category?: string;
}

export type TextData = {
  confidence: number;
  words: WordModel[];
};

export type ImageDetectionDatacategorized = {
  text: TextData;
  colors: {
    primary: string;
    score: number;
  }
}