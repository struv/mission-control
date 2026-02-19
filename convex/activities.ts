import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get recent activities
export const recent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    return await ctx.db
      .query("activities")
      .withIndex("by_timestamp")
      .order("desc")
      .take(limit);
  },
});

// Log an activity
export const log = mutation({
  args: {
    agent: v.string(),
    action: v.string(),
    target: v.optional(v.string()),
    type: v.union(v.literal("task"), v.literal("message"), v.literal("system"), v.literal("alert")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activities", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Seed sample activities
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("activities").collect();
    if (existing.length > 0) return "Already seeded";

    const now = Date.now();
    const activities = [
      { agent: "vie", action: "Started building", target: "Mission Control UI", type: "task" as const, timestamp: now - 5 * 60 * 1000 },
      { agent: "scearpo", action: "Detected whale signal on", target: "BONK", type: "alert" as const, timestamp: now - 15 * 60 * 1000 },
      { agent: "vie", action: "Processed drop from", target: "#drop channel", type: "task" as const, timestamp: now - 30 * 60 * 1000 },
      { agent: "levelsio", action: "Completed code review for", target: "ShiftSwap PR #42", type: "task" as const, timestamp: now - 60 * 60 * 1000 },
      { agent: "system", action: "Heartbeat check completed", type: "system" as const, timestamp: now - 2 * 60 * 60 * 1000 },
    ];

    for (const activity of activities) {
      await ctx.db.insert("activities", activity);
    }

    return "Seeded " + activities.length + " activities";
  },
});
