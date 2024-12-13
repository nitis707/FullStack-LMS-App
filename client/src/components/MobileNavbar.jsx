import React, { useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const MobileNavbar = () => {
  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logout.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full hover:bg-gray-400"
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
            <Link to="my-learning">My Learning</Link>
            <Link to="profile">Edit Profile</Link>
            <div
              onClick={logoutHandler}
              className="flex justify-between items-center"
            >
              <span>Logout</span>
              <LogOut />
            </div>
          </nav>

          {user?.role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  className="w-full"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Dashboard
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
