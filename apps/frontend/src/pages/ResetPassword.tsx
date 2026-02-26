import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { Card, CardContent } from "@/src/components/common/card";
import { Button } from "@/src/components/common/Button";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useForgotPassword } from "@/src/hooks/auth/useForgotPassword"; 
import { useResetPassword } from "@/src/hooks/auth/useResetPassword";

// Esquema alineado con las reglas del BACKEND (authSchema.ts)
const resetSchema = z.object({
  contraseña: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe tener una mayúscula")
    .regex(/[a-z]/, "Debe tener una minúscula")
    .regex(/\d/, "Debe tener un número")
    .regex(/[@$!%*?&]/, "Debe tener un carácter especial"),
  confirm: z.string()
}).refine((data) => data.contraseña === data.confirm, {
  message: "Las contraseñas no coinciden",
  path: ["confirm"],
});

type ResetFormData = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const tokenFromUrl = new URLSearchParams(search).get("token");

  const [step, setStep] = useState(tokenFromUrl ? 3 : 1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const { mutate: forgotPassword, isPending: isSendingEmail } = useForgotPassword();
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  useEffect(() => {
    if (step === 2) setSecondsLeft(180);
  }, [step]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword(email, {
      onSuccess: () => {
        toast.success("Instrucciones enviadas al correo");
        setStep(2);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Error al enviar el correo");
      }
    });
  };

  const onResetSubmit = (data: ResetFormData) => {
    if (!tokenFromUrl) {
      toast.error("Token no válido o expirado");
      return;
    }

    resetPassword({ token: tokenFromUrl, password: data.contraseña }, {
      onSuccess: () => {
        setStep(4);
      },
      onError: (error: any) => {
        // Muestra el primer error de validación del backend si existe
        const msg = Array.isArray(error.response?.data) 
          ? error.response.data[0] 
          : error.response?.data?.message || "Error al actualizar contraseña";
        toast.error(msg);
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#e5e5e5] font-inter">
      <div className="hidden md:flex md:w-1/3 xl:w-1/2 items-center justify-center">
        <div className="w-full h-full max-w-lg flex items-center justify-center">
          <div className="rounded-2xl w-full aspect-square flex flex-col items-center justify-center">
            <img src="/isotipo_tambo 1.svg" alt="Logo" className="w-3/4 h-auto" />
            <img src="/logotipo 1.svg" alt="Tambo" className="w-1/2 h-auto mt-4" />
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8">
        <Card className="w-full max-w-125 border-none shadow-none md:shadow-sm py-8 bg-white rounded-xl">
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center justify-start text-center space-y-4">
              <div className="w-auto flex items-start gap-2">
                <img src="/isotipo_tambo 1.svg" alt="logo" className="h-12" />
                <img src="/logotipo 1.svg" alt="tambo" className="h-6" />
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleRequestReset} className="space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">Recuperar contraseña</h1>
                  <p className="text-sm text-muted-foreground">Te enviaremos un email con las instrucciones.</p>
                </div>
                <div className="space-y-4 text-left">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1a1c1e]">Tu Email</label>
                    <input
                      type="email"
                      className="w-full h-14 px-4 bg-[#fafafa] border border-slate-200 rounded-xl outline-none"
                      placeholder="ejemplo@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button disabled={isSendingEmail} type="submit" className="w-full h-14 bg-[#1a1c1e] text-white rounded-xl font-bold flex items-center justify-center gap-2">
                  {isSendingEmail ? "Enviando..." : "Enviar instrucciones"} <ArrowRight size={20} />
                </Button>
                <div className="text-center">
                  <Link to={ROUTES.LOGIN} className="text-sm font-bold text-[#1a1c1e] hover:underline">Volver al inicio</Link>
                </div>
              </form>
            )}

            {step === 2 && (
              <section className="flex flex-col items-center justify-center gap-6 py-4 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">Revisa tu email</h2>
                <p className="text-sm text-muted-foreground">Hemos enviado un enlace a <b>{email}</b> para restablecer tu contraseña.</p>
                <Button variant="outline" className="w-full h-14 border-slate-200 font-bold rounded-xl" disabled={secondsLeft > 0}>
                  {secondsLeft > 0 ? `Reenviar en ${secondsLeft}s` : 'Reenviar email'}
                </Button>
              </section>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit(onResetSubmit)} className="space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">Nueva contraseña</h1>
                  <p className="text-sm text-muted-foreground">Crea una nueva clave segura para tu cuenta.</p>
                </div>
                <input type="text" name="username" autoComplete="username" style={{ display: 'none' }} />
                <div className="space-y-4 text-left">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1a1c1e]">Nueva Contraseña</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        className="w-full h-14 px-4 bg-[#fafafa] border border-slate-200 rounded-xl outline-none"
                        {...register("contraseña")}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.contraseña && <small className="text-red-500">{errors.contraseña.message}</small>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1a1c1e]">Confirmar Contraseña</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        className="w-full h-14 px-4 bg-[#fafafa] border border-slate-200 rounded-xl outline-none"
                        {...register("confirm")}
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirm && <small className="text-red-500">{errors.confirm.message}</small>}
                  </div>
                </div>
                <Button disabled={isResetting} type="submit" className="w-full h-14 bg-[#1a1c1e] text-white rounded-xl font-bold flex items-center justify-center gap-2">
                  {isResetting ? "Actualizando..." : "Actualizar contraseña"} <ArrowRight size={20} />
                </Button>
              </form>
            )}

            {step === 4 && (
              <section className="flex flex-col items-center justify-center gap-8 py-4 text-center">
                <img src="/successIcon.svg" alt="Éxito" className="w-24 h-24" />
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">¡Todo listo!</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">Tu contraseña ha sido actualizada. Ya puedes iniciar sesión.</p>
                </div>
                <Button onClick={() => navigate(ROUTES.LOGIN)} className="w-full h-14 bg-[#1a1c1e] text-white rounded-xl font-bold">
                  Ir al Login
                </Button>
              </section>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;