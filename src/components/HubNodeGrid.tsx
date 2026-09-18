import type { HubNode, LinkStats } from "@/lib/hub";
import HubNodeCard from "./HubNodeCard";

export default function HubNodeGrid({
  nodes,
  stats,
}: {
  nodes: HubNode[];
  stats?: Map<string, LinkStats>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {nodes.map((node) => {
        const stat = stats?.get(node.id);
        return (
          <HubNodeCard
            key={node.id}
            node={node}
            linkCount={stat?.count}
            linkTotal={stat?.total}
          />
        );
      })}
    </div>
  );
}
