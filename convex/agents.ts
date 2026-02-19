import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all agents
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("agents").collect();
  },
});

// Update agent status
export const updateStatus = mutation({
  args: {
    id: v.id("agents"),
    status: v.union(v.literal("active"), v.literal("idle"), v.literal("away")),
    currentTask: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      currentTask: args.currentTask,
      lastSeen: Date.now(),
    });
  },
});

// Initialize default agents (run once)
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("agents").collect();
    if (existing.length > 0) return "Already seeded";

    const agents = [
      { name: "Vie", emoji: "⟢", role: "Chief of Staff", status: "active" as const, currentTask: "Building Mission Control", color: "#a855f7" },
      { name: "Levelsio", emoji: "🚀", role: "Dev Lead", status: "idle" as const, currentTask: "Awaiting orders", color: "#22c55e" },
      { name: "Scearpo", emoji: "⚔️", role: "Financial Warfare", status: "idle" as const, currentTask: "Monitoring markets", color: "#ef4444" },
      { name: "Flint", emoji: "🔥", role: "Risk & Stress Testing", status: "away" as const, currentTask: "Off duty", color: "#f97316" },
    ];

    for (const agent of agents) {
      await ctx.db.insert("agents", { ...agent, lastSeen: Date.now() });
    }

    return "Seeded " + agents.length + " agents";
  },
});
