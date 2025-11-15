export type CharacterId = "tia" | "mochu" | "syrup" | "paffy";

export type Character = {
  id: CharacterId;
  name: string;
  species: "rabbit" | "dog";
  colorCode: string;
};

export const characters: Character[] = [
  {
    id: "tia",
    name: "ティア",
    species: "rabbit",
    colorCode: "#ffe4ec",
  },
  {
    id: "mochu",
    name: "もちゅ",
    species: "rabbit",
    colorCode: "#ffe9d2",
  },
  {
    id: "syrup",
    name: "シロップ",
    species: "rabbit",
    colorCode: "#e4ecff",
  },
  {
    id: "paffy",
    name: "ぱふぃー",
    species: "dog",
    colorCode: "#f5f5f5",
  },
];

export function getRandomCharacter(): Character {
  const idx = Math.floor(Math.random() * characters.length);
  return characters[idx];
}
