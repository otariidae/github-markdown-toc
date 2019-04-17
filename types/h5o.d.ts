declare module "h5o";

interface impliedHeading {
  implied: true
}
type heading = HTMLHeadingElement | impliedHeading

export interface Outline {
  startingNode: Node;
  sections: Section[];
}
export interface Section {
  heading: heading;
  sections: Section[];
  startingNode: HTMLElement;
}

export default function createOutline(
  startFrom: Node
): Outline
