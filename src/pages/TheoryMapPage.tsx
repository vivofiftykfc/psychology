import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import PageTransition from "../components/motion/PageTransition";

interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  school: string;
  chapterSlug: string;
  x?: number;
  y?: number;
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  source: string | SimNode;
  target: string | SimNode;
}

const nodes: SimNode[] = [
  { id: "struct", name: "结构主义", school: "早期", chapterSlug: "01-philosophical-roots" },
  { id: "funct", name: "功能主义", school: "早期", chapterSlug: "01-philosophical-roots" },
  { id: "psycho", name: "精神分析", school: "深层", chapterSlug: "02-psychoanalysis" },
  { id: "behavior", name: "行为主义", school: "行为", chapterSlug: "03-behaviorism" },
  { id: "human", name: "人本主义", school: "人本", chapterSlug: "04-humanistic" },
  { id: "cogn", name: "认知心理学", school: "认知", chapterSlug: "05-cognitive" },
  { id: "bio", name: "生物心理学", school: "生物", chapterSlug: "06-biological" },
  { id: "develop", name: "发展心理学", school: "发展", chapterSlug: "07-developmental" },
  { id: "social", name: "社会心理学", school: "社会", chapterSlug: "08-social" },
  { id: "clinical", name: "临床心理学", school: "临床", chapterSlug: "09-clinical" },
  { id: "positive", name: "积极心理学", school: "人本", chapterSlug: "04-humanistic" },
];

const links: SimLink[] = [
  { source: "struct", target: "funct" },
  { source: "struct", target: "cogn" },
  { source: "funct", target: "behavior" },
  { source: "behavior", target: "cogn" },
  { source: "behavior", target: "clinical" },
  { source: "psycho", target: "human" },
  { source: "psycho", target: "develop" },
  { source: "psycho", target: "clinical" },
  { source: "human", target: "positive" },
  { source: "human", target: "clinical" },
  { source: "cogn", target: "bio" },
  { source: "cogn", target: "develop" },
  { source: "cogn", target: "social" },
  { source: "bio", target: "clinical" },
  { source: "develop", target: "social" },
  { source: "social", target: "clinical" },
];

const schoolColors: Record<string, string> = {
  "早期": "#8b7355",
  "深层": "#a07060",
  "行为": "#7c9082",
  "人本": "#c8a96e",
  "认知": "#e8d5a3",
  "生物": "#9a9185",
  "发展": "#8b7355",
  "社会": "#c8a96e",
  "临床": "#a07060",
};

export default function TheoryMapPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = Math.min(window.innerHeight * 0.75, 600);

    const simulation = d3
      .forceSimulation<SimNode>(nodes)
      .force("link", d3.forceLink<SimNode, SimLink>(links).id((d) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    const g = svg.append("g");

    const link = g
      .selectAll<SVGLineElement, SimLink>("line")
      .data(links)
      .join("line")
      .attr("stroke", "#2a2622")
      .attr("stroke-width", 1.5);

    const node = g
      .selectAll<SVGGElement, SimNode>("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer")
      .on("click", (_e, d) => navigate(`/chapter/${d.chapterSlug}`));

    node
      .append("circle")
      .attr("r", 8)
      .attr("fill", (d) => schoolColors[d.school] || "#9a9185");

    node
      .append("text")
      .text((d) => d.name)
      .attr("x", 14)
      .attr("y", 4)
      .attr("fill", "#9a9185")
      .attr("font-size", "13px")
      .attr("font-family", "Inter, Noto Sans SC, sans-serif");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as SimNode).x!)
        .attr("y1", (d) => (d.source as SimNode).y!)
        .attr("x2", (d) => (d.target as SimNode).x!)
        .attr("y2", (d) => (d.target as SimNode).y!);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => { simulation.stop(); };
  }, [navigate]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
        <header className="mb-12">
          <p className="font-mono text-xs tracking-[0.2em] text-accent-dim uppercase">
            THEORY MAP
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight lg:text-7xl">
            理论图谱
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            点击节点可以跳转到对应的章节。拖拽节点改变布局，探索心理学各流派之间错综复杂的思想渊源。
          </p>
        </header>

        <div className="overflow-hidden rounded-sm border border-divider bg-surface">
          <svg ref={svgRef} width="100%" height={Math.min(window.innerHeight * 0.75, 600)} />
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-xs text-text-muted">
          {Object.entries(schoolColors).map(([school, color]) => (
            <div key={school} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
              {school}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
