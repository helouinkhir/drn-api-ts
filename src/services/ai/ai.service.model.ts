export type PostImageTextRequest = {
  data: { image: string };
};

export const enum Category {
  PHONE_NUMBER = "Phone number",
  BRAND = "Brand",
  Disc = "Disc",
  NA = "N/A"
}