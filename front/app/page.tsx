"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ManagerController } from "@/controller/ManagerController";
import { useUpdateCurrentManager } from "@/state/hooks/useUpdateCurrentManager";
import { AuthController } from "@/controller/AuthController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

export default function Login() {
  const router = useRouter()
  const setManager = useUpdateCurrentManager()
  const formSchema = z.object({
    // email: z.string().min(2).max(50),
    // password: z.string().min(4).max(30)
    idStore: z.string(),
    email: z.string(),
    password: z.string()
  })
  const [error, setError] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idStore: "1c4d651f-02df-4812-ab05-afdce94445f5",
      email: "centralSorvetes@gmail.com",
      password: "1234"
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const result = await AuthController.loginManager(values.idStore, values.email, values.password)
    console.log(result);
    if (result && result.resp === "Sucess") {
      setManager(result.manager)
      router.push("store")
    }
  }

  return (
    <main className="flex w-screen min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-[30rem] w-full">
        <Alert className="absolute top-10 w-fit">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
        <div className="mb-3 mt-6">
          <h1 className="text-xl font-semibold">IceCenter</h1>
        </div>
        <Card className="w-full">

          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-xl">Login</CardTitle>
          </CardHeader>

          <CardContent>
            <div>
              <FormProvider  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                  <FormField
                    control={form.control}
                    name="idStore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Id loja</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o id da loja" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite sua senha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full" type="submit">Entrar</Button>

                </form>
              </FormProvider >
            </div>
          </CardContent>

        </Card>
      </div>
    </main>
  );
}
