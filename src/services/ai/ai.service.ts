import { Request, Response } from "express";
import { Category, PostImageTextRequest } from "./ai.service.model";
import vision from "./vision/vision";
import {
  ImageDetectionData,
  ImageDetectionDatacategorized,
} from "./vision/vision.model";
import db from "../../db/db";
import { google } from "@google-cloud/vision/build/protos/protos";
import { createMapping, isCloseWord } from "../fuzzy-search/fuzzy-search.service";

/**
 * handle post /ai/image request to send response of vision data
 *
 * @param {Request} req express request
 * @param {Response} res express response
 * @returns {Promise<void>} void promise
 */
export const postImageText = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body as PostImageTextRequest;
  const visionResponse = await vision.getImageText(body.data.image);
  const brandsDbResponse = await db.getBrands(undefined);
  const discsDbResponse = await db.getDiscs(undefined, undefined, undefined);

  if (
    "errors" in visionResponse ||
    "errors" in brandsDbResponse ||
    "errors" in discsDbResponse
  ) {
    res.status(500).send({ errors: [] });
    return;
  }
  
  const brands = (brandsDbResponse.data as { BrandName: string }[]).map((b) =>
    b.BrandName
   );

  const discs = (discsDbResponse.data as { MoldName: string }[]).map((d) =>
    d.MoldName
  );
  const phoneRegex = /^(\(\d{3}\)\s|\d{3}-)\d{3}-\d{4}$/;
  res.send({
    data: categorizeData(visionResponse.data, brands, discs, phoneRegex),
  });
};

const categorizeData = (
  data: ImageDetectionData,
  brands: string[],
  discs: string[],
  phoneRegex: RegExp
): ImageDetectionDatacategorized => {

  const colorWithMaxScore = data.colors.reduce((prev, current) => {
    return prev.score > current.score ? prev : current;
  });


  const mappings = createMapping(data.text.words.length,
     data.text.words.map((w, index) => ({...w,rank: index})),
     brands,
     discs,
     phoneRegex,
     []
    )


  return  { 
    text: {...data.text, words:data.text.words.map(
      (w) => ({...w, category: getCategory(
        w.word.toLowerCase(),
        brands,
        discs,
        phoneRegex
      )}))} 
    ,
    colors : {
      primary: getPrimaryColor(colorWithMaxScore),
      score: colorWithMaxScore.score,
    }
  };
};


const getPrimaryColor = (
  color: google.cloud.vision.v1.IColorInfo & Record<"name", string>
) => {
  const maxKey = Object.entries(color.color).reduce((max, current) => {
    return current[1] > max[1] ? current : max;
  })[0];

  return maxKey.charAt(0).toUpperCase() + maxKey.slice(1);
};
