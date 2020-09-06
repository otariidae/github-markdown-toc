const trim = (str: string): string => str.trim()

export const trimmedText = (node: Node): string => trim(node.textContent || "")
