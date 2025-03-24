import AuthForm from "@/components/AuthForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function SignUp() {
  return <div className="mt-20 flex flex-1 flex-col items-center">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm type="register"/>
      </CardContent>
    </Card>
    </div>;
}

export default SignUp;
