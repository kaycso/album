import { decorations } from "../_data/scene";
import { Decoration } from "./decoration";

export function Background() {
  return (
    <>
      {decorations.map((decoration) => (
        <Decoration key={decoration.id} {...decoration} />
      ))}
    </>
  );
}
