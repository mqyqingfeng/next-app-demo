import { z } from "zod";
import { ListMap } from "@/lib/const";

export const createListZodSchema = z.object({
  name: z.string().min(1, {
    message: "名称不能为空",
  }),
  color: z
    .string()
    .min(1, {
      message: "请选择一个颜色",
    })
    .refine((color) => [...ListMap.keys()].includes(color)),
});

export type createListZodSchemaType = z.infer<typeof createListZodSchema>;
