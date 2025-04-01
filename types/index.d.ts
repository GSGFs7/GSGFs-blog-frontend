import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export * from "./auth";
export * from "./comment";
export * from "./common";
export * from "./gal";
export * from "./guest";
export * from "./posts";

