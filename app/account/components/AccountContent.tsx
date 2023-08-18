"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import Button from "@/components/Button";


const AccountContent = () => {
  const router = useRouter();
 
  const { isLoading, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  

  return ( 
    <div className="mb-7 px-6">
      
     
        <div className="flex flex-col gap-y-4">
         
          <Button
            disabled={loading || isLoading}
            //onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      
    </div>
  );
}
 
export default AccountContent;
