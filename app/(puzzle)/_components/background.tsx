import { Decoration } from "./decoration";

export function Background() {
  return (
    <>
      <Decoration
        src="/illustrations/heart-exclamation-svgrepo-com.svg"
        alt=""
        size={70}
        top="5%"
        left="8%"
        rotate={-15}
        animation="pulse"
        delay={0.3}
      />

      <Decoration
        src="/illustrations/heart-exclamation-svgrepo-com.svg"
        alt=""
        size={60}
        bottom="15%"
        right="12%"
        rotate={18}
        animation="pulse"
        delay={1.1}
      />

      <Decoration
        src="/illustrations/flowers-flower-svgrepo-com.svg"
        alt=""
        size={80}
        top="18%"
        right="18%"
        animation="sway"
        delay={0.6}
      />

      <Decoration
        src="/illustrations/flowers-flower-svgrepo-com.svg"
        alt=""
        size={90}
        bottom="8%"
        left="15%"
        animation="sway"
        delay={1.8}
      />
    </>
  );
}
