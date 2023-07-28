"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { 
  useSessionContext, 
  useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useAuthModal from "@/hooks/useAuthModal";

import Modal from './Modal';

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Modal 
      title="خوش آمدید" 
      description="وارد حسابتان شوید." 
      isOpen={isOpen} 
      onChange={onChange} 
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={[]}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
        localization={{
          variables: {
            sign_in: {
              email_label: 'ایمیل',
              password_label: 'پسورد',
              email_input_placeholder: "آدرس ایمیل",
	            password_input_placeholder: "پسورد",
	            button_label: "ورود",
	            loading_button_label: "ورود ...",
	            social_provider_text: "ورود با {{provider}}",
	            link_text: "حساب کاربری دارید؟ ورود"
            },
            sign_up: {
              email_label: "آدرس ایمیل",
              password_label: "پسورد",
              email_input_placeholder: "آدرس ایمیل",
              password_input_placeholder: "پسورد",
              button_label: "ثبت نام",
              loading_button_label: "ثبت نام ...",
              social_provider_text: "ورود با {{provider}}",
              link_text: "حساب کاربری ندارید؟ ثبت نام",
              confirmation_text: "ایمیلتان را برای لینک نایید چک کنید"
            },
            magic_link: {
              email_input_label: "آدرس ایمیل",
              email_input_placeholder: "آدرس ایمیل",
              button_label: "ارسال لینک جادویی",
              loading_button_label: "در حال ارسال لینک جادویی ...",
              link_text: "ارسال ایمیل لینک جادویی",
              confirmation_text: "ایمیلتان را برای لینک جادویی چک کنید"
            },
            forgotten_password: {
              email_label: "آدرس ایمیل",
              password_label: "پسورد",
              email_input_placeholder: "آدرس ایمیل",
              button_label: "بازیابی رمز عبور",
              loading_button_label: "ارسال لینک بازیابی ...",
              link_text: "پسورد خود را فراموش کرده اید؟",
              confirmation_text: "ایمیلتان را برای لینک بازیابی پسورد چک کنید"
            },
            update_password: {
              password_label: "پسورد جدید",
              password_input_placeholder: "پسورد جدید",
              button_label: "بروزرسانی پسورد",
              loading_button_label: "در حال بروزرسانی پسورد ...",
              confirmation_text: "پسوردتان بروزرسانی شده است"
            },
          },
        }}
        theme="dark"
        
      />
    </Modal>
  );
}

export default AuthModal;