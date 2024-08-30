"use client";
import CustomButton from "@/components/ui/CustomButton";
import { useFormTranslations } from "@/hooks/useFormTranslations";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMedia } from "react-use";

type FormValues = {
  name: string;
  link?: string;
  email: string;
};

export default function ContactForm() {
  const { register, handleSubmit, formState, reset, trigger } =
    useForm<FormValues>({
      mode: "onBlur",
    });
  const { isSubmitting, errors } = formState;

  const isSmallScreen = useMedia("(max-width:360px)", false);

  const { placeholders, buttons, validation } = useFormTranslations();
  const locale = useLocale();

  useEffect(() => {
    if (errors.name) {
      trigger("name");
    }
    if (errors.email) {
      trigger("email");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        reset();
        resolve();
        console.log(data);
      }, 2000);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full gap-5 flex flex-col"
    >
      <div className="flex flex-col gap-2">
        {/* Name Input */}
        <label>
          <input
            placeholder={placeholders.name}
            className={`bg-transparent rounded-none w-full py-[6px] px-3 placeholder:text-white text-white duration-200 outline-none border-b-2 transition-colors text-smd ${
              errors.name
                ? isSmallScreen
                  ? "border-b-red-500"
                  : "border-b-red-500"
                : "border-b-lightGrey"
            } focus:border-b-white`}
            type="text"
            {...register("name", {
              required: validation.nameRequired,
              minLength: {
                value: 3,
                message: validation.nameMinLength,
              },
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž]+(?:[\s-][A-Za-zÀ-ÖØ-öø-ÿĀ-ž]+)*$/,
                message: validation.namePattern,
              },
            })}
          />
          {errors.name && !isSmallScreen && (
            <div className="mt-1 ml-3">
              <p className="text-error text-smd">{errors.name.message}</p>
            </div>
          )}
        </label>

        {/* Email Input */}
        <label>
          <input
            placeholder={placeholders.email}
            className={`bg-transparent rounded-none w-full py-[6px] px-3 placeholder:text-white transition-color duration-200 text-white outline-none border-b-2 text-smd ${
              errors.email
                ? isSmallScreen
                  ? "border-b-red-500"
                  : "border-b-red-500"
                : "border-b-lightGrey"
            } focus:border-b-white`}
            type="email"
            {...register("email", {
              required: validation.emailRequired,
              minLength: {
                value: 6,
                message: validation.emailMinLength,
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: validation.emailPattern,
              },
            })}
          />
          {errors.email && !isSmallScreen && (
            <div className="mt-1 ml-3">
              <p className="text-error text-smd">{errors.email.message}</p>
            </div>
          )}
        </label>

        {/* Link Input */}
        <label>
          <input
            placeholder={placeholders.link}
            className={`bg-transparent w-full py-[6px] px-3 placeholder:text-white transition-colors duration-200 text-white outline-none border-b-2 rounded-none text-smd ${
              errors.link
                ? isSmallScreen
                  ? "border-b-red-500"
                  : "border-b-red-500"
                : "border-b-lightGrey"
            } focus:border-b-white`}
            type="text"
            {...register("link")}
          />
          {errors.link && !isSmallScreen && (
            <div className="mt-1 ml-3">
              <p className="text-error text-sm">{errors.link.message}</p>
            </div>
          )}
        </label>
      </div>

      <CustomButton variant="white" type="submit">
        {isSubmitting ? buttons.submitting : buttons.submit}
      </CustomButton>
    </form>
  );
}
