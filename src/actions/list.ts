"use server";

import {
  createListZodSchema,
  type createListZodSchemaType,
} from "@/schema/createList";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createList(data: createListZodSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("用户未登录，请先登录");
  }

  const result = createListZodSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: result.error.flatten().fieldErrors,
    };
  }

  // Todo: 数据库处理
  console.log(data);

  revalidatePath("/");

  return {
    success: true,
    message: "清单创建成功",
  };
}
