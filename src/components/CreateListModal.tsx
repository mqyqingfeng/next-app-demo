"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>添加清单</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>添加清单</SheetTitle>
          <SheetDescription>
            清单是任务的集合，比如“工作”、“生活”、“副业”
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              清单名称：
            </Label>
            <Input
              id="name"
              value="工作"
              onChange={() => {
                console.log(1);
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">创建</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
