import { ButtonLink } from "@/components/button";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="wrap flex min-h-[65vh] flex-col items-center justify-center py-24 text-center"
      >
        <p className="eyebrow">404</p>
        <h1 className="display mt-5 text-6xl md:text-7xl">
          This page is still <em className="text-olive">being drafted.</em>
        </h1>
        <ButtonLink href="/" className="mt-10">
          Back home
        </ButtonLink>
      </main>
    </>
  );
}
