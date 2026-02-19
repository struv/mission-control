import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all cron jobs
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cronJobs").collect();
  },
});

// Toggle job status
export const toggle = mutation({
  args: { id: v.id("cronJobs") },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.id);
    if (!job) throw new Error("Job not found");
    
    await ctx.db.patch(args.id, {
      status: job.status === "active" ? "paused" : "active",
    });
  },
});

// Update next run time
export const updateNextRun = mutation({
  args: {
    id: v.id("cronJobs"),
    nextRun: v.number(),
    lastRun: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      nextRun: args.nextRun,
      lastRun: args.lastRun,
    });
  },
});

// Create a new cron job
export const create = mutation({
  args: {
    name: v.string(),
    schedule: v.string(),
    cronExpr: v.optional(v.string()),
    owner: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cronJobs", {
      ...args,
      nextRun: Date.now() + 60 * 60 * 1000, // 1 hour from now default
      status: "active",
    });
  },
});

// Seed sample jobs
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("cronJobs").collect();
    if (existing.length > 0) return "Already seeded";

    const now = Date.now();
    const jobs = [
      { name: "Heartbeat Check", schedule: "Every 4 hours", owner: "vie", nextRun: now + 2 * 60 * 60 * 1000, lastRun: now - 2 * 60 * 60 * 1000, status: "active" as const },
      { name: "Whale Signal Monitor", schedule: "Every 15 minutes", owner: "scearpo", nextRun: now + 5 * 60 * 1000, lastRun: now - 10 * 60 * 1000, status: "active" as const },
      { name: "Learning Pipeline", schedule: "On #drop message", owner: "vie", nextRun: now + 24 * 60 * 60 * 1000, status: "active" as const },
      { name: "Memory Backup", schedule: "Daily at 3am", owner: "levelsio", nextRun: now + 8 * 60 * 60 * 1000, lastRun: now - 16 * 60 * 60 * 1000, status: "paused" as const },
    ];

    for (const job of jobs) {
      await ctx.db.insert("cronJobs", job);
    }

    return "Seeded " + jobs.length + " cron jobs";
  },
});
