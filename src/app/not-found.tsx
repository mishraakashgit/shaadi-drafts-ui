import { ButtonLink } from "@/components/button";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="wrap flex min-h-[60vh] flex-col items-center justify-center py-24 text-center"
      >
        <p className="script text-sage text-5xl">oops</p>
        <h1 className="mt-2 text-3xl md:text-4xl">This page is still being drafted.</h1>
        <ButtonLink href="/" variant="outline" className="mt-8">
          Back home
        </ButtonLink>
      </main>
    </>
  );
}
