import type { HubNode } from "@/lib/hub";
import HubNodeCard from "./HubNodeCard";

export default function HubNodeGrid({ nodes }: { nodes: HubNode[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {nodes.map((node) => <HubNodeCard key={node.id} node={node} />)}
    </div>
  );
}
