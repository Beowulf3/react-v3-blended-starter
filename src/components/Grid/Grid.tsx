import type { ReactNode } from "react";
import style from "./Grid.module.css";

interface GridPorps {
  children: ReactNode,
}

export default function Grid({ children }: GridPorps) {
  return <ul className={style.list}>{children}</ul>;
}
