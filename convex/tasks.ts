import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all tasks
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

// Get tasks by status
export const byStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_status", (q) => q.eq("status", args.status as any))
      .collect();
  },
});

// Get tasks by owner
export const byOwner = query({
  args: { owner: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_owner", (q) => q.eq("owner", args.owner))
      .collect();
  },
});

// Create a new task
export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    owner: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    project: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("tasks", {
      ...args,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update task status
export const updateStatus = mutation({
  args: {
    id: v.id("tasks"),
    status: v.union(v.literal("todo"), v.literal("in-progress"), v.literal("blocked"), v.literal("done")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

// Update task
export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    owner: v.optional(v.string()),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical"))),
    project: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );
    await ctx.db.patch(id, { ...filtered, updatedAt: Date.now() });
  },
});

// Delete task
export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Seed sample tasks
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("tasks").collect();
    if (existing.length > 0) return "Already seeded";

    const now = Date.now();
    const tasks = [
      { title: "Build Mission Control UI", status: "in-progress" as const, owner: "vie", priority: "high" as const, project: "mission-control" },
      { title: "Set up Convex backend", status: "in-progress" as const, owner: "vie", priority: "high" as const, project: "mission-control" },
      { title: "Whale signal monitoring", status: "in-progress" as const, owner: "scearpo", priority: "medium" as const, project: "trading" },
      { title: "Learning pipeline audit", status: "blocked" as const, owner: "levelsio", priority: "low" as const, project: "learning" },
      { title: "ShiftSwap API integration", status: "todo" as const, owner: "levelsio", priority: "high" as const, project: "shiftswap" },
    ];

    for (const task of tasks) {
      await ctx.db.insert("tasks", { ...task, createdAt: now, updatedAt: now });
    }

    return "Seeded " + tasks.length + " tasks";
  },
});
