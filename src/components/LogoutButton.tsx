"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  const handleLogout = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    let errorMessage = false;

    if (!errorMessage) {
      toast.success("Logged Out", {
        description: "You've been logged out successfully",
      });
      router.push('/')
    } else {
      toast.error("Error", {
        description: "Failed to logout. Please contact administrator",
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <Button
        variant="outline"
        onClick={handleLogout}
        disabled={loading}
        className="w-26"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Logout"}
      </Button>
    </div>
  );
}

export default LogoutButton;
