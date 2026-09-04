"use client";

import { useState } from "react";

type GeneratedContent = {
  captions: string[];
  hashtags: string[];
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [style, setStyle] = useState("Engaging");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter what your Instagram post is about.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          details: details.trim(),
          style,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Something went wrong while generating captions."
        );
      }

      if (!data?.result) {
        throw new Error("AI returned an empty result.");
      }

      setResult({
        captions: Array.isArray(data.result.captions)
          ? data.result.captions
          : [],
        hashtags: Array.isArray(data.result.hashtags)
          ? data.result.hashtags
          : [],
      });
    } catch (err) {
      console.error("GENERATION ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate Instagram captions."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyAll = async () => {
    if (!result) return;

    const text = [
      "INSTAGRAM CAPTION IDEAS",
      "",
      ...result.captions.map(
        (caption, index) => `${index + 1}. ${caption}`
      ),
      "",
      "HASHTAGS",
      "",
      result.hashtags.join(" "),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      alert("Copied successfully!");
    } catch {
      alert("Unable to copy. Please copy manually.");
    }
  };

  const copyCaption = async (caption: string) => {
    try {
      await navigator.clipboard.writeText(caption);
      alert("Caption copied!");
    } catch {
      alert("Unable to copy.");
    }
  };

  const copyHashtags = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.hashtags.join(" "));
      alert("Hashtags copied!");
    } catch {
      alert("Unable to copy.");
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#260b2d] via-[#16091d] to-black text-white">

      {/* BACKGROUND GLOWS */}

      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[600px] w-[800px] max-w-[100vw] -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-[150px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[40%] h-[350px] w-[350px] rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[58%] h-[350px] w-[350px] rounded-full bg-pink-500/10 blur-[140px]" />

      {/* NAVBAR */}

      <nav className="relative z-30 mx-3 mt-4 rounded-3xl border border-fuchsia-400/10 bg-zinc-950/75 px-4 py-4 shadow-2xl shadow-purple-950/20 backdrop-blur-2xl sm:mx-auto sm:mt-5 sm:max-w-6xl sm:px-6">

        <div className="flex items-center justify-between gap-3">

          {/* BRAND */}

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-fuchsia-400/20 bg-white/10">
              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-white sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[9px] text-zinc-500 sm:text-xs">
                AI Solutions That Work
              </p>
            </div>

          </div>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">

            <a
              href="#home"
              className="transition hover:text-fuchsia-300"
            >
              Home
            </a>

            <a
              href="#features"
              className="transition hover:text-fuchsia-300"
            >
              Features
            </a>

            <a
              href="#how"
              className="transition hover:text-fuchsia-300"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="transition hover:text-fuchsia-300"
            >
              FAQ
            </a>

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-fuchsia-400 px-5 py-2 font-medium text-black shadow-lg shadow-fuchsia-400/20 transition hover:bg-fuchsia-300"
            >
              Follow
            </a>

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-xs text-fuchsia-300 transition hover:bg-fuchsia-400/20 md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

        </div>

      </nav>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="relative z-40 mx-3 mt-2 rounded-3xl border border-fuchsia-400/10 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden">

          <div className="flex flex-col gap-1">

            {[
              ["#home", "Home"],
              ["#features", "Features"],
              ["#how", "How To Use"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-fuchsia-400/10 hover:text-fuchsia-300"
              >
                {label}
              </a>
            ))}

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-2xl bg-fuchsia-400 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-fuchsia-300"
            >
              Follow
            </a>

          </div>

        </div>
      )}

      {/* HERO */}

      <section
        id="home"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-8 sm:pt-24"
      >

        {/* BADGE */}

        <div className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-xs text-fuchsia-200">
          ✨ AI-Powered Instagram Caption Generator
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-fuchsia-400">
            KrishAIWorks
          </span>
        </p>

        {/* HEADING */}

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">

          Turn Your Posts Into

          <br />

          <span className="bg-gradient-to-r from-fuchsia-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Captions That Connect.
          </span>

        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Generate creative Instagram captions and relevant hashtags with AI.
          Turn your post idea into content that fits your style.
        </p>

        {/* PILLS */}

        <div className="mt-7 flex max-w-full flex-wrap justify-center gap-3">

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            ✨ Creative Captions
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            #️⃣ Relevant Hashtags
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            ⚡ Instant Generation
          </span>

        </div>

        {/* GENERATOR */}

        <div
          id="generator"
          className="mt-12 w-full max-w-4xl"
        >

          <div className="w-full rounded-[2rem] border border-fuchsia-400/10 bg-zinc-950/60 p-4 text-left shadow-2xl shadow-purple-950/30 backdrop-blur-2xl sm:p-7">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
              Instagram Caption Generator
            </p>

            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              Let's create your next caption.
            </h2>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Tell AI what your post is about and get captions instantly.
            </p>

            <div className="mt-7 space-y-5">

              {/* TOPIC */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  What is your post about?
                </label>

                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Example: A sunset photo from my trip to the mountains..."
                  rows={5}
                  className="box-border block w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 transition focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/10 sm:px-5"
                />

              </div>

              {/* DETAILS */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Extra Details{" "}
                  <span className="text-zinc-600">(Optional)</span>
                </label>

                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Mood, audience, keywords, context, emojis, etc..."
                  rows={5}
                  className="box-border block w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 transition focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/10 sm:px-5"
                />

              </div>

              {/* STYLE */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Caption Style
                </label>

                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="box-border h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/10"
                >
                  <option>Engaging</option>
                  <option>Funny</option>
                  <option>Professional</option>
                  <option>Inspirational</option>
                  <option>Minimal</option>
                  <option>Trendy</option>
                  <option>Emotional</option>
                  <option>Curiosity-Driven</option>
                </select>

              </div>

              {/* BUTTON */}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="h-14 w-full rounded-2xl bg-fuchsia-400 px-5 text-sm font-semibold text-black shadow-xl shadow-fuchsia-400/20 transition hover:bg-fuchsia-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "🧠 Creating Your Captions..."
                  : "✨ Generate Instagram Captions"}
              </button>

            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-300">
                ⚠️ {error}
              </div>
            )}

            {/* RESULT */}

            {result && (
              <div
                id="instagram-result"
                className="mt-8 rounded-3xl border border-fuchsia-400/10 bg-black/40 p-4 shadow-xl shadow-purple-950/10 sm:p-7"
              >

                {/* RESULT HEADER */}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
                      AI Generated Result
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-white">
                      Your Instagram Content
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={copyAll}
                    className="w-full rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-medium text-fuchsia-300 transition hover:bg-fuchsia-400/20 sm:w-auto"
                  >
                    📋 Copy All
                  </button>

                </div>

                {/* CAPTIONS */}

                <div className="mt-7">

                  {/* HIGHLIGHTED HEADING */}

                  <div className="flex items-center gap-2 rounded-2xl border border-fuchsia-400/10 bg-fuchsia-400/5 px-4 py-3">

                    <span className="text-lg">✨</span>

                    <h4 className="text-sm font-bold uppercase tracking-wider text-fuchsia-300">
                      Caption Ideas
                    </h4>

                  </div>

                  <div className="mt-4 space-y-3">

                    {result.captions.length > 0 ? (
                      result.captions.map((caption, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-white/5 bg-zinc-950/70 p-4"
                        >

                          <div className="flex items-start justify-between gap-3">

                            <p className="min-w-0 text-sm leading-7 text-zinc-200">
                              <span className="mr-2 font-bold text-fuchsia-400">
                                {index + 1}.
                              </span>

                              {caption}
                            </p>

                            <button
                              type="button"
                              onClick={() => copyCaption(caption)}
                              className="shrink-0 rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] text-zinc-400 transition hover:border-fuchsia-400/30 hover:text-fuchsia-300"
                            >
                              Copy
                            </button>

                          </div>

                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-white/5 bg-zinc-950/60 p-4 text-sm text-zinc-500">
                        No caption ideas returned.
                      </div>
                    )}

                  </div>

                </div>

                {/* HASHTAGS */}

                <div className="mt-8">

                  {/* HIGHLIGHTED HEADING */}

                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-fuchsia-400/10 bg-fuchsia-400/5 px-4 py-3">

                    <div className="flex items-center gap-2">

                      <span className="text-lg">#️⃣</span>

                      <h4 className="text-sm font-bold uppercase tracking-wider text-fuchsia-300">
                        Hashtags
                      </h4>

                    </div>

                    <button
                      type="button"
                      onClick={copyHashtags}
                      className="rounded-lg border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1.5 text-[10px] text-fuchsia-300 transition hover:bg-fuchsia-400/20"
                    >
                      Copy
                    </button>

                  </div>

                  <div className="mt-4 rounded-2xl border border-white/5 bg-zinc-950/70 p-5">

                    {result.hashtags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">

                        {result.hashtags.map((hashtag, index) => (
                          <span
                            key={index}
                            className="rounded-full border border-fuchsia-400/10 bg-fuchsia-400/5 px-3 py-2 text-xs text-zinc-300"
                          >
                            {hashtag.startsWith("#")
                              ? hashtag
                              : `#${hashtag}`}
                          </span>
                        ))}

                      </div>
                    ) : (
                      <p className="text-sm text-zinc-500">
                        No hashtags returned.
                      </p>
                    )}

                  </div>

                </div>

              </div>
            )}

            <p className="mt-4 text-xs leading-5 text-zinc-600">
              AI-generated content should be reviewed and customized before
              publishing your post.
            </p>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
            What You Get
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Captions made for your content.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Create engaging Instagram content without spending hours thinking
            about the perfect caption.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <FeatureCard
            icon="✨"
            title="Creative Captions"
            description="Generate fresh caption ideas based on your post and chosen style."
          />

          <FeatureCard
            icon="#️⃣"
            title="Relevant Hashtags"
            description="Get useful hashtags related to your content and topic."
          />

          <FeatureCard
            icon="⚡"
            title="Instant Generation"
            description="Turn your idea into ready-to-use Instagram content in seconds."
          />

          <FeatureCard
            icon="🎭"
            title="Multiple Styles"
            description="Choose from engaging, funny, professional, emotional, trendy and more."
          />

          <FeatureCard
            icon="🧠"
            title="AI-Powered Ideas"
            description="Let AI create different angles and caption approaches for your post."
          />

          <FeatureCard
            icon="📋"
            title="Easy To Copy"
            description="Copy individual captions, hashtags or your complete result instantly."
          />

        </div>

      </section>

      {/* HOW TO USE */}

      <section
        id="how"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
            How To Use
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Three simple steps.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Create your Instagram caption in just a few seconds.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <StepCard
            number="01"
            title="Describe Your Post"
            description="Tell AI what your Instagram post is about."
          />

          <StepCard
            number="02"
            title="Choose Your Style"
            description="Select the tone and style that fits your content."
          />

          <StepCard
            number="03"
            title="Generate & Copy"
            description="Get caption ideas and hashtags, then copy what you like."
          />

        </div>

      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="relative z-10 mx-auto w-full max-w-3xl px-4 py-24 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          <Faq
            question="What can this Instagram generator create?"
            answer="It can generate multiple Instagram caption ideas and relevant hashtags based on your post topic, details and selected style."
          />

          <Faq
            question="Can I choose a caption style?"
            answer="Yes. You can choose styles such as Engaging, Funny, Professional, Inspirational, Minimal, Trendy, Emotional and Curiosity-Driven."
          />

          <Faq
            question="Can I copy individual captions?"
            answer="Yes. You can copy individual captions, all generated hashtags, or the complete result."
          />

          <Faq
            question="Can I use the generated captions directly?"
            answer="You can use them as a starting point, but reviewing and customizing AI-generated content before posting is recommended."
          />

        </div>

      </section>

      {/* CTA */}

      <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 sm:px-8">

        <div className="rounded-[2rem] border border-fuchsia-400/10 bg-fuchsia-950/20 px-5 py-14 text-center shadow-2xl shadow-purple-950/20">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
            Create Better Captions
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Your next post deserves a great caption.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
            Turn your idea into engaging captions and relevant hashtags with
            AI.
          </p>

          <a
            href="#generator"
            className="mt-7 inline-flex rounded-full bg-fuchsia-400 px-6 py-3 text-sm font-semibold text-black shadow-xl shadow-fuchsia-400/20 transition hover:bg-fuchsia-300"
          >
            ✨ Generate Caption
          </a>

        </div>

      </section>

      {/* ================================================= */}
{/* FOOTER */}
{/* ================================================= */}

<footer className="relative z-10 border-t border-white/5 px-4 py-10">
  <div className="mx-auto max-w-6xl">

    {/* Related Tools */}
    <div className="mb-10 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        Explore More
      </p>

      <h3 className="mt-2 text-xl font-bold text-white">
        More AI Content Tools
      </h3>

      <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500">
        Explore more AI-powered tools from KrishAIWorks to create,
        improve, and optimize your content.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* AI LinkedIn Post Generator */}
      <a
        href="https://ailinkedinpostgenerator.krishaiworks.com/"
        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-lg">
          💼
        </div>

        <h4 className="font-semibold text-white transition-colors group-hover:text-zinc-200">
          AI LinkedIn Post Generator
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Create professional and engaging LinkedIn posts with AI.
        </p>
      </a>

      {/* AI YouTube Title & Description Generator */}
      <a
        href="https://aiyoutubetitledescriptiongenerator.krishaiworks.com/"
        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-lg">
          🎬
        </div>

        <h4 className="font-semibold text-white transition-colors group-hover:text-zinc-200">
          AI YouTube Title & Description
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Generate engaging titles and descriptions for YouTube videos.
        </p>
      </a>

      {/* AI Blog Generator */}
      <a
        href="https://aibloggenerator.krishaiworks.com/"
        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-lg">
          ✍️
        </div>

        <h4 className="font-semibold text-white transition-colors group-hover:text-zinc-200">
          AI Blog Generator
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Generate high-quality blog content quickly with AI.
        </p>
      </a>

      {/* AI Text Humanizer */}
      <a
        href="https://aitexthumanizer.krishaiworks.com/"
        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-lg">
          📝
        </div>

        <h4 className="font-semibold text-white transition-colors group-hover:text-zinc-200">
          AI Text Humanizer
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Make AI-generated content sound more natural and human.
        </p>
      </a>

    </div>

    {/* Main Footer */}
    <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/5 pt-8 text-center sm:flex-row sm:text-left">

      <div>
        <p className="text-sm font-semibold text-white">
          KrishAIWorks
        </p>

        <p className="mt-2 text-xs text-zinc-600">
          AI Solutions That Work
        </p>
      </div>

      <p className="text-xs text-zinc-700">
        © {new Date().getFullYear()} KrishAIWorks. All rights reserved.
      </p>

    </div>

  </div>
</footer>

    </main>
  );
}

/* FEATURE CARD */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-400/20 hover:bg-zinc-950/70">

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-400/10 bg-fuchsia-400/5 text-xl">
        {icon}
      </div>

      <h3 className="mt-5 text-base font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* STEP CARD */

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-6 backdrop-blur-xl">

      <p className="text-sm font-bold text-fuchsia-400">
        {number}
      </p>

      <h3 className="mt-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* FAQ */

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/5 bg-zinc-950/50 p-5 backdrop-blur-xl">

      <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-zinc-200">
        {question}
      </summary>

      <p className="mt-4 text-sm leading-7 text-zinc-500">
        {answer}
      </p>

    </details>
  );
}