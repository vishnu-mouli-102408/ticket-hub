import type { UserJSON } from "@clerk/backend";
import { v, type Validator } from "convex/values";

import { internalMutation, query } from "./_generated/server";

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    return user;
  },
});

// Create and update user from Clerk
export const upsertUserFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  handler: async (ctx, { data }) => {
    const userAttributes = {
      email: data?.email_addresses[0]?.email_address ?? "",
      phone: data?.phone_numbers[0]?.phone_number ?? "",
      name: `${data?.first_name ?? ""} ${data?.last_name ?? ""}`,
      userId: data?.id,
    };

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", data?.id))
      .first();

    if (user) {
      await ctx.db.patch(user._id, userAttributes);
    } else {
      await ctx.db.insert("users", userAttributes);
    }

    console.log("User created or updated", user?._id);

    return user;
  },
});

export const deleteUser = internalMutation({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();
    if (user) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(`User with userId ${userId} not found`);
    }
  },
});
