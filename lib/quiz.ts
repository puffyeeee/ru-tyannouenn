export type DentalField =
  | "保存修復"
  | "歯内療法"
  | "補綴"
  | "口腔外科"
  | "矯正歯科"
  | "小児歯科"
  | "予防歯科"
  | "歯周病"
  | "高齢者歯科"
  | "その他";

export const dentalFields: { value: DentalField; label: string }[] = [
  { value: "保存修復", label: "保存修復" },
  { value: "歯内療法", label: "歯内療法" },
  { value: "補綴", label: "補綴" },
  { value: "口腔外科", label: "口腔外科" },
  { value: "矯正歯科", label: "矯正歯科" },
  { value: "小児歯科", label: "小児歯科" },
  { value: "予防歯科", label: "予防歯科" },
  { value: "歯周病", label: "歯周病" },
  { value: "高齢者歯科", label: "高齢者歯科" },
  { value: "その他", label: "その他" },
];