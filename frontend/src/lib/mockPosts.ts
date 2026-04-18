import type { PostCardProps } from "@/components/PostCard";

export const MOCK_POSTS: PostCardProps[] = [
  {
    id: "1",
    author: { name: "Dr. Sarah Chen", username: "sarahc", avatar: "S", reputationScore: 9420 },
    content:
      "OpenAI's new architecture shifts from pure transformer attention to a hybrid sparse-dense routing mechanism. This could theoretically reduce inference cost by 60% while maintaining reasoning quality. The implications for edge deployment are enormous — we may see GPT-class models running on consumer hardware within 18 months.",
    tldrSummary:
      "OpenAI's hybrid sparse-dense architecture could reduce inference costs by 60%, potentially enabling GPT-class AI on consumer devices within 18 months.",
    originalUrl: "https://openai.com/research/architecture-update",
    factCheckStatus: "VERIFIED",
    trustScore: 91,
    tags: ["AI", "OpenAI", "Architecture", "LLM"],
    timeAgo: "12 min ago",
    likes: 1204,
    saves: 387,
  },
  {
    id: "2",
    author: { name: "Alex Rivera", username: "alexr", avatar: "A", reputationScore: 8750 },
    content:
      "The recent EU AI Act enforcement guidelines have a subtle but critical clause on 'general purpose AI' systems. Any model above 10^25 FLOPs training compute is now classified as high-risk and requires a full conformity assessment. This catches Gemini Ultra, GPT-4o, and Claude 3 Opus. Compliance deadlines are Q3 2026.",
    tldrSummary:
      "EU AI Act now classifies models trained above 10^25 FLOPs as high-risk, requiring conformity assessments. Affects Gemini, GPT-4o, and Claude. Q3 2026 deadline.",
    originalUrl: "https://digital-strategy.ec.europa.eu/ai-act",
    factCheckStatus: "VERIFIED",
    trustScore: 88,
    tags: ["EU AI Act", "Regulation", "Compliance"],
    timeAgo: "34 min ago",
    likes: 892,
    saves: 610,
  },
  {
    id: "3",
    author: { name: "Priya Nair", username: "priyan", avatar: "P", reputationScore: 7890 },
    content:
      "BREAKING: Fusion energy researchers at NIF have reportedly achieved ignition 5 times in the past month with consistent Q > 1.5 results. If this data holds through peer review, we are looking at a fundamental energy paradigm shift within the decade. Commercial viability estimates are being aggressively revised.",
    tldrSummary:
      "NIF researchers report 5 successful fusion ignitions (Q > 1.5) in one month. If peer-reviewed successfully, commercial fusion energy may arrive within a decade.",
    factCheckStatus: "DISPUTED",
    trustScore: 54,
    tags: ["Fusion Energy", "Science", "Energy"],
    timeAgo: "1 hr ago",
    likes: 3401,
    saves: 1203,
  },
  {
    id: "4",
    author: { name: "Marcus Webb", username: "marcusw", avatar: "M", reputationScore: 5230 },
    content:
      "Quantum computing breakthrough: IBM's 1121-qubit Condor processor has demonstrated error rates below 0.1% for two-qubit gates using their new real-time error correction algorithm. This is the critical threshold needed before fault-tolerant quantum computing becomes tractable for enterprise use.",
    tldrSummary:
      "IBM's 1121-qubit Condor hits sub-0.1% two-qubit error rates — the key threshold for fault-tolerant quantum computing in enterprise applications.",
    originalUrl: "https://research.ibm.com/quantum-condor",
    factCheckStatus: "VERIFIED",
    trustScore: 94,
    tags: ["Quantum", "IBM", "Computing"],
    timeAgo: "2 hr ago",
    likes: 2105,
    saves: 884,
  },
  {
    id: "5",
    author: { name: "Zoe Kim", username: "zoek", avatar: "Z", reputationScore: 3100 },
    content:
      "Viral claim: '5G causes brain tumors in 100% of lab mice.' This story is spreading rapidly on social platforms. I've tracked it back to a misquoted paper from a fringe journal with no peer review. The actual study tested 60GHz millimeter waves at power levels 1000x above any consumer device.",
    factCheckStatus: "FALSE",
    trustScore: 8,
    tags: ["5G", "Misinformation", "Health"],
    timeAgo: "3 hr ago",
    likes: 4892,
    saves: 2100,
  },
  {
    id: "6",
    author: { name: "Raj Patel", username: "rajp", avatar: "R", reputationScore: 6600 },
    content:
      "Just published our comparative analysis of vector databases for RAG architectures: Pinecone vs Weaviate vs Qdrant vs ChromaDB. TL;DR: Pinecone wins on managed scalability, Weaviate on flexibility, Qdrant on on-prem performance. ChromaDB for local development only.",
    tldrSummary:
      "RAG vector DB comparison: Pinecone for scale, Weaviate for flexibility, Qdrant for on-prem performance, ChromaDB for local dev only.",
    factCheckStatus: "PENDING",
    tags: ["VectorDB", "RAG", "LLM", "DevOps"],
    timeAgo: "5 hr ago",
    likes: 1567,
    saves: 945,
  },
];

