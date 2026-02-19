import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Agent status and info
  agents: defineTable({
    name: v.string(),
    emoji: v.string(),
    role: v.string(),
    status: v.union(v.literal("active"), v.literal("idle"), v.literal("away")),
    currentTask: v.optional(v.string()),
    color: v.string(),
    lastSeen: v.number(), // timestamp
  }),

  // Tasks for the kanban board
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("blocked"),
      v.literal("done")
    ),
    owner: v.string(), // agent id or "william"
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("critical")
    ),
    project: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"])
    .index("by_owner", ["owner"]),

  // Scheduled/cron jobs
  cronJobs: defineTable({
    name: v.string(),
    schedule: v.string(), // human readable
    cronExpr: v.optional(v.string()), // actual cron expression
    nextRun: v.number(),
    lastRun: v.optional(v.number()),
    status: v.union(v.literal("active"), v.literal("paused"), v.literal("error")),
    owner: v.string(),
  }).index("by_status", ["status"]),

  // Activity feed
  activities: defineTable({
    agent: v.string(),
    action: v.string(),
    target: v.optional(v.string()),
    type: v.union(
      v.literal("task"),
      v.literal("message"),
      v.literal("system"),
      v.literal("alert")
    ),
    timestamp: v.number(),
  }).index("by_timestamp", ["timestamp"]),
});
