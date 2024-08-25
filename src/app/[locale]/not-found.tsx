import { useTranslations } from "next-intl";
import Link from "next/link";
export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link href="/">{t("button-title")}</Link>
    </div>
  );
}
