"use client";

import { useEffect } from "react";

export default function ExtensionCrashBypass() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalRemoveChild = Node.prototype.removeChild;
      (Node.prototype as any).removeChild = function (child: any) {
        if (child.parentNode !== this) {
          console.warn("Extension bypass: prevented removeChild crash");
          return child;
        }
        return originalRemoveChild.call(this, child);
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      (Node.prototype as any).insertBefore = function (newNode: any, referenceNode: any) {
        if (referenceNode && referenceNode.parentNode !== this) {
          console.warn("Extension bypass: prevented insertBefore crash");
          return newNode;
        }
        return originalInsertBefore.apply(this, arguments as any);
      };
    }
  }, []);

  return null;
}
