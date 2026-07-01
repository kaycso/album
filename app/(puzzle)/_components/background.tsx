import { scene } from "../_data/scene";
import { Decoration } from "./decoration";

export function Background() {
  return (
    <>
      {scene.decorations.map((decoration) => (
        <Decoration key={decoration.id} {...decoration} />
      ))}
    </>
  );
}
