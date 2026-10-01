import type { Cluster, ChatMessage, UserProfile, InformationItem } from "../types";

export function answerInfoLensQuery(
  query: string,
  clusters: Cluster[],
  userProfile: UserProfile,
  allItems: InformationItem[]
): ChatMessage {
  const q = query.toLowerCase().trim();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. "What should I know today?"
  if (q.includes("what should i know") || q.includes("overview") || q.includes("brief me") || q.includes("highlights")) {
    const topClusters = clusters.filter(c => !c.isDigestItem).slice(0, 3);
    const criticalUrgent = clusters.find(c => c.id.includes("hackathon") || c.reasoning.bypassedQuietHours);

    let text = `Here is your high-priority personalized executive briefing for today:\n\n`;
    if (criticalUrgent) {
      text += `🚨 **Action Required**: Project Mentor Dr. Aris Vance flagged an urgent deadline for **Hackathon 2026** submissions before 23:59 tonight. PR #14 merged RAG and MCP tools.\n\n`;
    }

    text += `### Top Signals Today:\n`;
    topClusters.forEach((c, idx) => {
      text += `**${idx + 1}. ${c.title}** (Importance: ${c.importanceScore}/100)\n`;
      text += `${c.quickSummary}\n\n`;
    });

    const sources = topClusters.flatMap(c => c.items.slice(0, 2)).map(item => ({
      id: item.id,
      title: item.title,
      sourceName: item.sourceName,
      sourceType: item.sourceType,
      url: item.url
    }));

    return {
      id: `msg-${Date.now()}`,
      sender: "infolens",
      text,
      timestamp,
      sources: sources.slice(0, 4),
      clusterReferenceId: topClusters[0]?.id
    };
  }

  // 2. "What happened in AI today?"
  if (q.includes("ai") || q.includes("artificial intelligence") || q.includes("openai") || q.includes("model")) {
    const aiClusters = clusters.filter(c => c.topics.includes("AI") || c.category.includes("AI"));
    const primary = aiClusters[0] || clusters[0];

    let text = `### What Happened in AI Today\n\n`;
    text += `Frontier AI saw major developments today across reasoning architectures and standardized tool integration:\n\n`;
    text += `1. **${primary.title}**:\n${primary.summary}\n\n`;

    const mcpCluster = clusters.find(c => c.id.includes("mcp"));
    if (mcpCluster) {
      text += `2. **${mcpCluster.title}**:\n${mcpCluster.quickSummary}\n\n`;
    }

    const ragCluster = clusters.find(c => c.id.includes("rag"));
    if (ragCluster) {
      text += `3. **Retrieval Architectures**:\n${ragCluster.quickSummary}\n\n`;
    }

    text += `*Note: AI relevance is currently configured at **${userProfile.interests["AI"] ?? 100}/100** in your profile.*`;

    const sources = primary.items.slice(0, 3).map(item => ({
      id: item.id,
      title: item.title,
      sourceName: item.sourceName,
      sourceType: item.sourceType,
      url: item.url
    }));

    return {
      id: `msg-${Date.now()}`,
      sender: "infolens",
      text,
      timestamp,
      sources,
      clusterReferenceId: primary.id
    };
  }

  // 3. "What changed since yesterday?"
  if (q.includes("changed") || q.includes("yesterday") || q.includes("diff") || q.includes("updates")) {
    const urgentItems = allItems.filter(i => i.metadata?.urgent || i.sourceType === "message");
    const text = `### Key Changes in the Last 24 Hours\n\n` +
      `1. **New Direct Messages**: You received 2 high-priority simulated messages regarding Hackathon 2026 deadlines and exam hall tickets.\n` +
      `2. **Critical Vulnerability**: CISA released an emergency directive for CVE-2026-4401 in OpenSSL.\n` +
      `3. **OpenAI Model Drop**: Sam Altman unveiled the newest reasoning model with 40% lower latency.\n` +
      `4. **4 Cross-Post Duplicates Deduplicated**: InfoLens automatically filtered duplicate news releases from ArsTechnica and BleepingComputer so your attention remains focused.`;

    const sources = urgentItems.slice(0, 3).map(item => ({
      id: item.id,
      title: item.title,
      sourceName: item.sourceName,
      sourceType: item.sourceType,
      url: item.url
    }));

    return {
      id: `msg-${Date.now()}`,
      sender: "infolens",
      text,
      timestamp,
      sources,
      clusterReferenceId: "cluster-hackathon-mentor"
    };
  }

  // 4. "Show me information related to my hackathon."
  if (q.includes("hackathon") || q.includes("mentor") || q.includes("competition")) {
    const hackathonCluster = clusters.find(c => c.id.includes("hackathon"));
    if (!hackathonCluster) {
      return {
        id: `msg-${Date.now()}`,
        sender: "infolens",
        text: "No hackathon items found matching your filters.",
        timestamp
      };
    }

    const text = `### Hackathon 2026 Status & Directives\n\n` +
      `**Cluster Importance Score: ${hackathonCluster.importanceScore}/100** (Critical Action)\n\n` +
      `${hackathonCluster.deepSummary}\n\n` +
      `#### Checklist for Today:\n` +
      `- [x] Verify offline resilience & local test fallback\n` +
      `- [x] Review multi-agent pipeline explainability UI\n` +
      `- [ ] Complete semifinal slides before 23:59 portal deadline`;

    const sources = hackathonCluster.items.map(item => ({
      id: item.id,
      title: item.title,
      sourceName: item.sourceName,
      sourceType: item.sourceType,
      url: item.url
    }));

    return {
      id: `msg-${Date.now()}`,
      sender: "infolens",
      text,
      timestamp,
      sources,
      clusterReferenceId: hackathonCluster.id
    };
  }

  // 5. "Why is this important?"
  if (q.includes("why is this important") || q.includes("why is this") || q.includes("why am i seeing")) {
    const topCluster = clusters[0];
    const text = `### Transparency & Importance Breakdown for "${topCluster.title}"\n\n` +
      `**Final Calculated Score**: **${topCluster.importanceScore}/100** (${topCluster.priority.toUpperCase()})\n\n` +
      `Here is why our Personalization Engine elevated this:\n\n` +
      topCluster.reasoning.bulletReasons.map(r => `- ${r}`).join("\n") +
      `\n\n*You can modify interest weights or mute entities anytime in User Preferences to instantly recalculate your space.*`;

    const sources = topCluster.items.slice(0, 3).map(item => ({
      id: item.id,
      title: item.title,
      sourceName: item.sourceName,
      sourceType: item.sourceType,
      url: item.url
    }));

    return {
      id: `msg-${Date.now()}`,
      sender: "infolens",
      text,
      timestamp,
      sources,
      clusterReferenceId: topCluster.id
    };
  }

  // 6. "Summarize today's cybersecurity news."
  if (q.includes("cybersecurity") || q.includes("security") || q.includes("vulnerability") || q.includes("cve")) {
    const secClusters = clusters.filter(c => c.topics.includes("Cybersecurity") || c.category.includes("Cybersecurity"));
    const primary = secClusters[0];

    let text = `### Today's Cybersecurity Intelligence Summary\n\n`;
    if (primary) {
      text += `**Primary Threat: ${primary.title}** (Score: ${primary.importanceScore}/100)\n\n`;
      text += `${primary.deepSummary}\n\n`;
    }

    const secAgentic = clusters.find(c => c.id.includes("agentic-security"));
    if (secAgentic) {
      text += `**Secondary Advisory: ${secAgentic.title}**\n\n`;
      text += `${secAgentic.quickSummary}\n\n`;
    }

    const sources = (primary ? primary.items : []).map(item => ({
      id: item.id,
      title: item.title,
      sourceName: item.sourceName,
      sourceType: item.sourceType,
      url: item.url
    }));

    return {
      id: `msg-${Date.now()}`,
      sender: "infolens",
      text,
      timestamp,
      sources,
      clusterReferenceId: primary?.id
    };
  }

  // Generic fallback query answering from best matching cluster
  let bestCluster = clusters[0];
  let maxScore = -1;
  for (const c of clusters) {
    let score = 0;
    const clusterText = `${c.title} ${c.summary} ${c.topics.join(" ")} ${c.keyEntities.join(" ")}`.toLowerCase();
    const words = q.split(" ").filter(w => w.length > 2);
    for (const w of words) {
      if (clusterText.includes(w)) score += 2;
    }
    if (score > maxScore) {
      maxScore = score;
      bestCluster = c;
    }
  }

  const text = `### Synthesis for "${query}"\n\n` +
    `Based on your ingested information space and active clusters, the most relevant intelligence is **${bestCluster.title}**:\n\n` +
    `${bestCluster.summary}\n\n` +
    `**Key Insights:**\n` +
    bestCluster.keyPoints.slice(0, 3).map(kp => `- ${kp}`).join("\n") +
    `\n\n*Importance Score: ${bestCluster.importanceScore}/100 based on your profile.*`;

  const sources = bestCluster.items.slice(0, 3).map(item => ({
    id: item.id,
    title: item.title,
    sourceName: item.sourceName,
    sourceType: item.sourceType,
    url: item.url
  }));

  return {
    id: `msg-${Date.now()}`,
    sender: "infolens",
    text,
    timestamp,
    sources,
    clusterReferenceId: bestCluster.id
  };
}
