'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


const PasskeyModal = () => {
    const router = useRouter();
    const [Open, setOpen] = useState(true);
    const [passKey, setpassKey] = useState('');
    const [error, seterror] = useState('');

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        

        if(passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            router.push('/admin')
            setOpen(false);
        } else {
            seterror('Invalid passkey. Please try again.');
        }
    }

    const closeModal = () => {
        setOpen(false);
        router.push('/');
    }

    return(
        <AlertDialog open={Open} onOpenChange={setOpen}>
            <AlertDialogContent className='shad-alert-dialog bg-zinc-900 border-0'>
                <AlertDialogHeader>
                <AlertDialogTitle className='flex justify-between items-start text-zinc-300'>
                    Admin Access Verification
                    <Image
                        src="close.svg"
                        alt='close'
                        height={20}
                        width={20}
                        onClick={() => closeModal()}
                        className='cursor-pointer'
                    />
                </AlertDialogTitle>
                <AlertDialogDescription>
                    To access the admin page, please enter the passkey.
                </AlertDialogDescription>
                </AlertDialogHeader>

                <div>
                    <InputOTP maxLength={6} value={passKey} onChange={(value) => setpassKey(value)}>
                        <InputOTPGroup className='shad-otp text-zinc-200'>
                            <InputOTPSlot className='shad-otp-slot focus:border-zinc-300' index={0} />
                            <InputOTPSlot className='shad-otp-slot focus:border-zinc-300' index={1} />
                            <InputOTPSlot className='shad-otp-slot focus:border-zinc-300' index={2} />
                            <InputOTPSlot className='shad-otp-slot focus:border-zinc-300' index={3} />
                            <InputOTPSlot className='shad-otp-slot focus:border-zinc-300' index={4} />
                            <InputOTPSlot className='shad-otp-slot focus:border-zinc-300' index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                    {error && <p className='shad-error text-14-regular mt-4 flex justify-center text-zinc-300'>{error}</p>}

                </div>

                <AlertDialogFooter>
                <AlertDialogAction className="shad-primary-btn w-full" onClick={(e) => validatePasskey(e)}>
                    Enter Admin Passkey
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PasskeyModal;