import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  return <div className="mt-20 flex flex-1 flex-col items-center">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm type="login"/>
      </CardContent>
    </Card>
    </div>;
}

export default Login;
