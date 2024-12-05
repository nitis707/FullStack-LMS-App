import React from "react";
import { Button } from "@/components/ui/button";
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
import { LogOut, Menu } from "lucide-react";
import DarkMode from "../DarkMode";
import { Separator } from "./ui/separator";

const MobileNavbar = () => {
  const role = "instructor";

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-gray-200 hover:bg-gray-400"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-4">
            <SheetTitle>E-Learning</SheetTitle>
            <SheetDescription></SheetDescription>
            <DarkMode />
          </SheetHeader>
          <Separator />

          <nav className="flex flex-col space-y-4">
            <span>My Learning</span>
            <span>Edit Profile</span>
            <div className="flex justify-between items-center">
              <span>Logout</span>
              <LogOut />
            </div>
          </nav>

          {role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button>Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
